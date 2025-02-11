const { db } = require("../config/dbConnection");
const { upload } = require("../middleware/uploadImg");
const cloudinary = require("../utils/cloudinary");

//get All product
const getAllProduct = async (req, res) => {
  try {
    const [resultSets, fields] = await db.query("CALL fetchProducts(null)");
    res.status(200).json(resultSets[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// const getAlllProduct = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       sort = "createdAt",
//       order = "desc",
//       filter = "",
//       category,
//     } = req.query;

//     let qry = "SELECT * FROM products";

//     if (filter) {
//       qry += ` WHERE name LIKE '%${filter}%'`;
//     }

//     if (category) {
//       if (filter) {
//         qry += ` AND category = '${category}'`;
//       } else {
//         qry += ` WHERE category = '${category}'`;
//       }
//     }

//     qry += ` ORDER BY ${sort} ${order}`;

//     const offset = (page - 1) * limit;
//     qry += ` LIMIT ${limit} OFFSET ${offset}`;

//     db.query(qry, (err, data) => {
//       if (err) throw err;
//       res.status(200).json(data);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//get Single Product
const getSingleProd = async (req, res) => {
  const { id } = req.params;
  try {
    const [resultSets, fields] = await db.query("CALL fetchProducts(?)", [id]);
    res.status(200).json(resultSets);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//add rating to product
const addReview = async (req, res) => {
  const { rating, productId, userId, review } = req.body;
  console.log(productId, userId, rating, review);

  try {
    const [checkReviewResult] = await db.query(
      "CALL manageReviews('checkReview',?,?,?,?)",
      [productId, userId, null, null]
    );

    if (checkReviewResult[0].length > 0) {
      await db.query("CALL manageReviews('updateReview',?,?,?,?)", [
        productId,
        userId,
        rating,
        review,
      ]);
      return res.status(200).json({ message: "Review updated successfully!" });
    } else {
      await db.query("CALL manageReviews('addReview',?,?,?,?)", [
        productId,
        userId,
        rating,
        review,
      ]);
      return res.status(200).json({ message: "Review added successfully!" });
    }
  } catch (error) {
    console.error("Error managing review:", error);
    res.status(500).send("Internal Server Error");
  }
};

//del review from product
const delReview = async (req, res) => {
  const { review_id } = req.params;

  try {
    const qry = "delete from reviews where review_id = ?";

    const [resultSets, fields] = await db.query(qry, [review_id]);
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//fetch users review
const getUsersReview = async (req, res, next) => {
  const { productId, userId } = req.body;
  try {
    const qry =
      "SELECT users.name, reviews.* FROM reviews JOIN users ON reviews.user_id = users.user_id 	WHERE reviews.product_id = ? and reviews.user_id = ?;";
    const [resultSets, fields] = await db.query(qry, [productId, userId]);
    return res.status(200).json(resultSets[0]);
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ error: error.message });
  }
};

//get review by product
const getAllReviewOfProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const [resultSets, fields] = await db.query(
      "CALL manageReviews('getAllProdReview',?,?,?,?)",
      [productId, null, null, null]
    );
    return res.status(200).json(resultSets[0]);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//upload Img
const uploadImg = async (req, res, next) => {
  try {
    cloudinary.uploader.upload(req.file.path, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }

      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

//del Img
const delImage = async (req, res, next) => {
  try {
    const { public_id } = req.params;
    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      res.status(200).json({
        success: true,
        message: "Deleted!",
        data: result,
      });
    });
  } catch (error) {}
};

//add to cart
const addProduct = async (req, res) => {
  const {
    category_id,
    seller_id,
    image,
    title,
    description,
    size,
    price,
    stock,
  } = req.body;
  try {
    const result = await db.query(
      "call manageSellerProduct('addProd',?,?,?,?,?,?,?,?,?)",
      [
        category_id,
        seller_id,
        null,
        price,
        stock,
        image,
        title,
        description,
        null,
      ]
    );

    // console.log(result[0][0][0].prod_id)
    const product_id = result[0][0][0]?.prod_id;

    const transactionResult = await db.query(
      "call order_transaction(?,?,?,?,?)",
      [
        seller_id,
        product_id,
        stock,
        null,
        stock
      ]
    );
    res.status(200).json({ message: "Product Added SuccesFully..." });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//edit product
const updateProduct = async (req, res) => {
  const {
    category_id,
    seller_id,
    image,
    title,
    description,
    size,
    price,
    stock,
    product_id,
  } = req.body;
  try {
    const result = await db.query(
      "call manageSellerProduct('updateProd',?,?,?,?,?,?,?,?,?)",
      [
        category_id,
        seller_id,
        null,
        price,
        stock,
        image,
        title,
        description,
        product_id,
      ]
    );
    res.status(200).json({ message: "Product Updated SuccesFully..." });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//const del
const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  try {
    const result = await db.query("call delSellerProd(?)", [product_id]);
    res.status(200).json({ message: "product Deleted Succesfully" });
  } catch (error) {
    throw new Error(error);
  }
};

//get product by seller id
const getProductsBySellerId = async (req, res) => {
  const { seller_id } = req.params;

  console.log(seller_id);

  try {
    const [result, column] = await db.query("call fetchProductBySellerId(?)", [
      seller_id,
    ]);
    res.status(200).json(result[0]);
  } catch (error) {
    throw new Error(error);
  }
};

//active inactive product
const toogleProd = async (req, res) => {
  const { product_id } = req.params;
  console.log(product_id);
  
  try {
    const [result, column] = await db.query("call activeProd(?)", [product_id]);
    res.status(200).json({message : "toogle work"});
  } catch (error) {
    throw new Error(error);
  }
};

//search product
const searchProd = async (req, res) => {
  const { search, page, seller_id } = req.body;
  console.log(search, page, seller_id);

  try {
    const [resultSets, feild] = await db.query("call searchProd(?,?,?)", [
      search,
      page,
      seller_id,
    ]);
    res.status(200).json(resultSets[0]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUsersReview,
  getAllProduct,
  getSingleProd,
  addReview,
  getAllReviewOfProduct,
  delReview,
  uploadImg,
  delImage,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsBySellerId,
  searchProd,
  toogleProd,
};
