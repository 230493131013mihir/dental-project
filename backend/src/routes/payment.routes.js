const express = require("express");
const {
  createOrder,
  verifyPayment,
  createOfflinePayment,
  getPayments,
} = require("../controller/payment.controller");

const router = express.Router();

router.get("/getPayments", getPayments);
router.post("/createOrder", createOrder);
router.post("/offline", createOfflinePayment);
router.post("/verify", verifyPayment);

module.exports = router;
