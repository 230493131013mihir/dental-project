const express = require("express");
const {
  getDashboard,
  getAppointmentTrend,
  getAppointmentsList,
  branchWiseRevenue,
} = require("../controller/dashboard.controller");

const router = express.Router();

router.get("/dashboard", getDashboard);
router.get("/trend", getAppointmentTrend);
router.get("/appointments", getAppointmentsList);
router.get("/branchWiseRevenue", branchWiseRevenue);


module.exports = router;