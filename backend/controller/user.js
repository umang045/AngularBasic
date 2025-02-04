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
      "call manageAddress('checkAddress',?,?,?,?,?,?,?)",
      [country, state, city, address, pincode, users_id, null]
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
  const { country, state, city, address, pincode, users_id } = req.body;
  try {
    const [result, feild] = await db.query(
      "call manageAddress('addAddress',?,?,?,?,?,?,?)",
      [country, state, city, address, pincode, users_id, null]
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
      "call manageAddress('fetchAddress',?,?,?,?,?,?,?)",
      [null, null, null, null, null, users_id, null]
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
      "call manageAddress('delAddress',?,?,?,?,?,?,?)",
      [null, null, null, null, null, null, address_id]
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

//add Order
const addOrder = (req, res) => {
  const { uid, amunt } = req.body;
  const date = new Date();
  const qry = "insert into order set ?";
  const values = {
    user_id: uid,
    order_date: moment(date).format("YYYY/MM/DD"),
    amount: amunt,
  };
  db.query(qry, values);
};

//place order

const placeOrder = async(req,res) =>{
  exports.placeOrder = asyncErrorHandler(async (req, res, next) => {
    /*
      Notes:
      get cart data
      insert in payment
      insert in orders
      insert in order_item
      decrease stock
      increase total_sell
      clear cart data
  */
    let { payment_method, address_id } = req.body;
    let user_id = req.user.id;
    //start transaction
    await db.query("START TRANSACTION");
   
    try {
      //get cart data********************************
      let [cart_data] = await db.query("select * from cart where user_id=?", [
        user_id,
      ]);
      // console.log(cart_data);
      if (cart_data.length === 0) {
        await db.query("ROLLBACK");
        return res.status(401).send({ result: false, msg: "Cart is Empty!!" });
      }
   
      let total_amount = 0,
        status = "Pending";
      for (let i = 0; i < cart_data.length; i++) {
        total_amount += cart_data[i].totalPrice;
      }
      //   console.log(total_amount);
      //   console.log(new Date());
   
      //insert in payment**************************
      let [payment] = await db.query("call CREATE_PAYMENT(?,?,?,?,?)", [
        user_id,
        total_amount,
        payment_method,
        new Date(),
        status,
      ]);
      //   console.log(payment[0][0].payment_id);
      let payment_id = payment[0][0].payment_id;
   
      //insert in order****************************
      let [check] = await db.query("select user_id from address where id=?", [
        address_id,
      ]);
      console.log(check);
   
      if (check[0].user_id != user_id) {
        await db.query("ROLLBACK");
        return res
          .status(401)
          .send({ result: false, msg: "Wrong Address Provided!!" });
      }
      let [order] = await db.query("call CREATE_ORDER(?,?,?,?)", [
        user_id,
        address_id,
        payment_id,
        status,
      ]);
   
      //   console.log(order[0][0].id);
      let order_id = order[0][0].id;
   
      //insert in order_items**********************
      for (let i = 0; i < cart_data.length; i++) {
        await db.query("call ADD_ITEMS_TO_ORDER_ITEMS(?,?,?,?)", [
          order_id,
          cart_data[i].product_id,
          cart_data[i].quantity,
          cart_data[i].price,
        ]);
   
        let [stock] = await db.query("select stock from products where id=?", [
          cart_data[i].product_id,
        ]);
   
        // console.log(stock);
   
        if (stock[0].stock < cart_data[i].quantity) {
          await db.query("ROLLBACK");
          return res
            .status(401)
            .send({ result: false, msg: "Product Out of Stock!!" });
        }
   
        await db.query(
          "update products set stock=stock-?,total_sell=total_sell+? where id=?",
          [cart_data[i].quantity, cart_data[i].quantity, cart_data[i].product_id]
        );
      }
   
      //clear cart
      await db.query("delete from cart where user_id=?", [user_id]);
   
      //commit transaction
      await db.query("COMMIT");
   
      res.status(200).send({ result: true });
    } catch (error) {
      //rollback transaction
      await db.query("ROLLBACK");
      console.log(error);
      return res.status(401).send({ result: false, msg: "Bad Request" });
    }
  });
}

module.exports = {
  // getUser,
  addUsersAddress,
  checkAddress,
  getAllUsers,
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  getUserById,
  fetchUsersAddress,
  delUsersAddress,
  checkProdCart,
};
