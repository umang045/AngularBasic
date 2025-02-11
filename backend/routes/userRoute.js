const express = require("express");
const {
  getUser,
  getAllUsers,
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  updateUserProfile,
  getUserById,
  addUsersAddress,
  checkAddress,
  fetchUsersAddress,
  delUsersAddress,
  checkProdCart,
  placeOrder,
  getUsersOrder,
  getUsersOrdersProd,
  delUserOrder,
  fetchSellerOrders,
  fetchSingleSellerOrders,
} = require("../controller/user");
const { updateProfilePic } = require("../controller/auth");
const router = express.Router();

router.post("/addorder", placeOrder);
router.post("/delUserOrder", delUserOrder);
router.post("/addAddress", checkAddress, addUsersAddress);
router.get("/getAddress/:users_id", fetchUsersAddress);
router.get("/getUserOrder/:user_id", getUsersOrder);
router.get("/getUserOrderProd/:order_id", getUsersOrdersProd);
router.delete("/delAddress/:address_id", delUsersAddress);
router.get("/:id", getUserById);
router.get("/find/all", getAllUsers);
router.post("/checkCart", checkProdCart);
// router.get("/find/:userId", getUser);
router.post("/addCart", addToCart);
router.put("/updatePic", updateProfilePic);
router.get("/getCart/:id", getCart);
router.delete("/delCart/:id", removeFromCart);
router.put("/updtQnty", updateQuantity);

router.get("/seller/getOrder/:seller_id", fetchSellerOrders);
router.get("/seller/getSinlgeOrder/:order_id", fetchSingleSellerOrders);

module.exports = router;