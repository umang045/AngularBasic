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
  totalUsers,
  getOrderByStatus,
  getOrderByDate,
  onOffEvent,
  getStatusCount,
  getYearWiseSell,
  getSellersOrderCount,
  getSellersAmountCount,
  getSellerAllProductCount,
  getAllProductCountForAdmin,
  getOrderCountForAdmin,
  getAmountCountForAdmin,
  getStatusCountForAdmin,
  getOrderForAdmin,
} = require("../controller/user");
const { updateProfilePic } = require("../controller/auth");
const { authMiddleware } = require("../middleware/authMiddleare");
const router = express.Router();

router.get("/seller/getOrderStatusCount", authMiddleware, getStatusCount);
router.get("/seller/getSellersTotalSells", authMiddleware, getYearWiseSell);
router.get("/seller/filterOrder/time/:dif", authMiddleware, getOrderByDate);
router.get("/seller/getAllOrderCount", authMiddleware, getSellersOrderCount);
router.get("/seller/getAllSellCount", authMiddleware, getSellersAmountCount);
router.get("/seller/getAllProdCount", authMiddleware, getSellerAllProductCount);

router.get(
  "/admin/getAllProdCountForAdmin",
  authMiddleware,
  getAllProductCountForAdmin
);
router.get(
  "/admin/getOrdersForAdmin",
  authMiddleware,
  getOrderForAdmin
);
router.get(
  "/admin/getAllOrderCountForAdmin",
  authMiddleware,
  getOrderCountForAdmin
);
router.get(
  "/admin/getAllAmountCountForAdmin",
  authMiddleware,
  getAmountCountForAdmin
);
router.get(
  "/admin/getStatusCount",
  authMiddleware,
  getStatusCountForAdmin
);

router.post("/addorder", authMiddleware, placeOrder);
router.post("/delUserOrder", delUserOrder);
router.post("/addAddress", checkAddress, addUsersAddress);
router.get("/getAddress/:users_id", fetchUsersAddress);
router.get("/totalUser", authMiddleware, totalUsers);
router.get("/getUserOrder/:user_id", getUsersOrder);
router.get("/getUserOrderProd/:order_id", getUsersOrdersProd);
router.delete("/delAddress/:address_id", delUsersAddress);
router.get("/:id", getUserById);
router.get("/find/all", getAllUsers);
router.post("/checkCart", checkProdCart);

router.post("/addCart", addToCart);
router.put("/updatePic", updateProfilePic);
router.get("/getCart/:id", getCart);
router.delete("/delCart/:id", removeFromCart);
router.put("/updtQnty", updateQuantity);

router.get("/seller/getOrder/:seller_id", fetchSellerOrders);

router.get(
  "/seller/filterOrder/status/:status",
  authMiddleware,
  getOrderByStatus
);
router.post("/seller/onoffschedule", authMiddleware, onOffEvent);
router.get("/seller/getSinlgeOrder/:order_id", fetchSingleSellerOrders);

module.exports = router;
