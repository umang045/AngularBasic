const jwt = require("jsonwebtoken");
const { db } = require("../config/dbConnection");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//get one user
// const getUser = (req, res) => {
//   const userId = req.params.userId;
//   const qry = "select * from users where user_id = ?";

//   db.query(qry, [userId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     const { password, ...others } = data[0];
//     return res.status(200).json(others);
//   });
// };

//get all users
const getAllUsers = async (req, res) => {
  try {
    const [resultSets, fields] = await db.query("CALL getusr()");

    const users = resultSets[0];
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const qry = "select * from users where user_id = ?";
    const [resultSets, fields] = await db.query(qry, [id], (err, data) => {
      if (err) return res.status(500).json(err);
    });
    const { password, ...others } = resultSets[0];
    res.json(others);
  } catch (error) {
    console.log(error);
  }
};

//add middleware to check users address
const checkAddress = async (req, res, next) => {
  try {
    const { country, state, city, address, pincode, users_id } = req.body;
    const [result, feild] = await db.query(
      "call manageAddress('checkAddress',?,?,?,?,?,?,?,?,?)",
      [country, state, city, address, pincode, null, null, users_id, null]
    );
    const total = result[0][0]?.totalRecord;
    if (total >= 3) {
      return res
        .status(409)
        .json({ message: "you can not add more than 3 address" });
    } else {
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

//add address of users
const addUsersAddress = async (req, res, next) => {
  const { country, state, city, address, pincode, lat, lng, users_id } =
    req.body;
  try {
    const [result, feild] = await db.query(
      "call manageAddress('addAddress',?,?,?,?,?,?,?,?,?)",
      [country, state, city, address, pincode, lat, lng, users_id, null]
    );
    res
      .status(200)
      .json({ message: "your address has been added successfully" });
  } catch (error) {
    throw new Error(error);
  }
};

//fetch users address
const fetchUsersAddress = async (req, res, next) => {
  try {
    const { users_id } = req.params;
    const [result, feild] = await db.query(
      "call manageAddress('fetchAddress',?,?,?,?,?,?,?,?,?)",
      [null, null, null, null, null, null, null, users_id, null]
    );
    res.status(200).json(result[0]);
  } catch (error) {}
};

//del users address
const delUsersAddress = async (req, res, next) => {
  try {
    const { address_id } = req.params;
    console.log(address_id);

    const [result, feild] = await db.query(
      "call manageAddress('delAddress',?,?,?,?,?,?,?,?,?)",
      [null, null, null, null, null, null, null, null, address_id]
    );
    res.status(200).json({ message: "your address deleted sucesfully" });
  } catch (error) {
    throw new Error(error);
  }
};

//add cart
const addToCart = async (req, res) => {
  try {
    const { u_id, p_id, color_id, qntyty, size } = req.body;
    const [resultSets, fields] = await db.query(
      "CALL manageCart('findSingleProdInCart',?,?,?,?,?,?)",
      [u_id, p_id, null, null, null, null]
    );
    console.log(resultSets[0].length);

    if (resultSets[0].length > 0)
      return res.status(409).json("Item Already Added In Cart");
    else {
      const [resultSets, fields] = await db.query(
        "CALL manageCart('addToCart',?,?,?,?,?,?)",
        [u_id, p_id, color_id, qntyty, size, null]
      );
      res.status(200).json({ message: "Product Added succesfully" });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//check Product In Cart
const checkProdCart = async (req, res) => {
  try {
    const { u_id, p_id } = req.body;
    const [resultSets, fields] = await db.query(
      "CALL manageCart('findSingleProdInCart',?,?,?,?,?,?)",
      [u_id, p_id, null, null, null, null]
    );
    console.log(resultSets[0]);

    return res.status(200).json(resultSets[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//remove from cart
const removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultSets, fields] = await db.query(
      "CALL manageCart('removeFromCart',?,?,?,?,?,?)",
      [null, null, null, null, null, id]
    );
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//get Cart
const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultSets, fields] = await db.query(
      "CALL manageCart('fetchCart',?,?,?,?,?,?)",
      [id, null, null, null, null, null]
    );
    return res.status(200).json(resultSets[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//update Quantity in Cart
const updateQuantity = async (req, res) => {
  const { pid, uid, quntity } = req.body;
  console.log(pid, uid, quntity);

  try {
    const [resultSets, fields] = await db.query(
      "call manageCart('updateQuantityCart',?,?,?,?,?,?)",
      [uid, pid, 1, quntity, null, null]
    );

    return res.status(200).json({ message: "quantity updated succesfully" });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//place order
const placeOrder = async (req, res) => {
  const { payment_method, payment_status, address_id, user_id } = req.body;
  // console.log(payment_method, address_id, user_id);

  try {
    //get cart
    // await db.query("start transaction");
    const [cartResult, fields] = await db.query(
      "CALL manageCart('fetchCart',?,?,?,?,?,?)",
      [user_id, null, null, null, null, null]
    );
    if (cartResult.length == 0) {
      // await db.query("rollback");
      return res.status(409).json({ message: "nothing in your cart!!" });
    }

    //calcul
    let amount = 0;
    let Orderstatus = "pending";
    for (let index = 0; index < cartResult[0].length; index++) {
      if (cartResult[0][index]?.active == true) {
        amount += cartResult[0][index]?.price * cartResult[0][index]?.quantity;
      }
    }

    console.log("total calculate thyo");

    //add to order
    const [orderResult] = await db.query("call addOrder (?,?,?,?)", [
      user_id,
      address_id,
      amount,
      Orderstatus,
    ]);

    console.log("order pydo");

    const orderId = orderResult[0][0].order_id;

    // console.log("Inserted Order ID:", orderId);

    // console.log(amount);
    console.log("order ni id lidhi");

    //add in payment table
    const [paymentResult] = await db.query("call addPayment(?,?,?,?,?)", [
      orderId,
      user_id,
      payment_method,
      amount,
      payment_status,
    ]);

    console.log("payment nu kyru");

    //add order_items
    for (let index = 0; index < cartResult[0].length; index++) {
      if (cartResult[0][index]?.active == true) {
        const [orderItemResult, orderItemFields] = await db.query(
          "call addOrderItem(?,?,?,?,?,?)",
          [
            orderId,
            cartResult[0][index].product_id,
            cartResult[0][index].color_id,
            cartResult[0][index].quantity,
            cartResult[0][index].size,
            cartResult[0][index].price,
          ]
        );

        //update stock & total sell
        let [stockResult] = await db.query(
          "update products set stock=stock-?,totalsell=totalsell+? where product_id=?",
          [
            cartResult[0][index].quantity,
            cartResult[0][index].quantity,
            cartResult[0][index].product_id,
          ]
        );

        let [prodResult] = await db.query(
          "select stock from products where product_id =?",
          [cartResult[0][index].product_id]
        );

        console.log(prodResult[0]?.stock);

        let [transactionResult] = await db.query(
          "call order_transaction(?,?,?,?,?)",
          [
            user_id,
            cartResult[0][index].product_id,
            null,
            cartResult[0][index].quantity,
            prodResult[0]?.stock
          ]
        );
      }
    }
    console.log("order item add thy");

    await db.query("delete from cart where user_id = ?", [user_id]);

    console.log("cart khali thyu");

    return res.json({ message: "order Placed SuccesFully!!" });
  } catch (error) {
    // await db.query("rollback");
    throw new Error(error);
  }
};

//const get users order
const getUsersOrder = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [resultSets, fields] = await db.query("CALL fetchUserOrders(?)", [
      user_id,
    ]);
    return res.status(200).json(resultSets[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//get users order
const getUsersOrdersProd = async (req, res) => {
  const { order_id } = req.params;
  try {
    const [resultSets, fields] = await db.query("CALL fetchUsersOrderItem(?)", [
      order_id,
    ]);
    return res.status(200).json(resultSets[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//delete users order
const delUserOrder = async (req, res) => {
  const { order_id, status, user_id } = req.body;
  try {
    const [stock] = await db.query("call updateOrderStatus(?,?)", [
      status,
      order_id,
    ]);

    const [orderItems] = await db.query(
      "select * from order_items where order_id = ?",
      [order_id]
    );

    for (let index = 0; index < orderItems.length; index++) {
      const [stock] = await db.query(
        `update products set stock=stock+? , totalsell = totalsell-?
        where  product_id = ?`,
        [
          orderItems[index]?.quantity,
          orderItems[index]?.quantity,
          orderItems[index].product_id,
        ]
      );

      let [transactionResult] = await db.query(
        "call order_transaction(?,?,?,?)",
        [
          user_id,
          orderItems[index].product_id,
          orderItems[index].quantity,
          null,
        ]
      );
    }

    return res.status(200).json({ message: "order Canceeled Succesfully" });
  } catch (error) {
    throw new Error(error);
  }
};

//fetch Seller Products
const fetchSellerOrders = async (req, res) => {
  const { seller_id } = req.params;
  try {
    const [result] = await db.query("call getSellerOrders(?)", [seller_id]);
    res.status(200).json(result[0]);
  } catch (error) {
    throw new Error(error);
  }
};

//fetch Single products
const fetchSingleSellerOrders = async (req, res) => {
  const { order_id } = req.params;
  try {
    const [result] = await db.query("call getSingleOrder(?)", [order_id]);
    res.status(200).json(result);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  // getUser,
  placeOrder,
  getUsersOrder,
  fetchSingleSellerOrders,
  addUsersAddress,
  getUsersOrdersProd,
  checkAddress,
  getAllUsers,
  addToCart,
  getCart,
  removeFromCart,
  fetchSellerOrders,
  delUserOrder,
  updateQuantity,
  getUserById,
  fetchUsersAddress,
  delUsersAddress,
  checkProdCart,
};
