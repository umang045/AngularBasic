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
} = require("../controller/product");
const { upload } = require("../middleware/uploadImg");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getSingleProd);
router.post("/review", addReview);
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