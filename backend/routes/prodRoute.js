const express = require("express");
const {
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
  getUsersReview,
  toogleProd,
  getProdTrans,
  getOutOfStockProd,
  updateProdStock,
  getSellerTotalProd,
  getAllColors,
} = require("../controller/product");
const { upload } = require("../middleware/uploadImg");
const cloudinary = require("../utils/cloudinary");
const { authMiddleware } = require("../middleware/authMiddleare");

const router = express.Router();

router.get("/getSellerTotalProd", authMiddleware, getSellerTotalProd);
router.get("/", getAllProduct);
router.get("/colors", getAllColors);
router.get("/:id", getSingleProd);
router.get("/getProdTrans/:product_id", getProdTrans);
router.post("/review", addReview);
router.get("/getOutStockProd/:seller_id", getOutOfStockProd);
router.post("/updateStock", updateProdStock);
router.post("/active/:product_id", toogleProd);
router.get("/review/:id", getAllReviewOfProduct);
router.delete("/review/del/:review_id", delReview);
router.post("/getUserReview", getUsersReview);

router.post("/sellerProd/search", searchProd);
router.get("/sellerProd/:seller_id", getProductsBySellerId);
router.post("/", addProduct);
router.put("/", updateProduct);
router.delete("/:product_id", deleteProduct);
router.post("/image/upload", upload.single("image"), uploadImg);
router.delete("/image/del/:public_id", delImage);

module.exports = router;
