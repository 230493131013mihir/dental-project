const express = require("express");
const {
  getFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controller/faq.controller");

const router = express.Router();

router.get("/getFAQ", getFAQ);
router.post("/addFAQ", addFAQ);
router.put("/updateFAQ/:id", updateFAQ);
router.delete("/deleteFAQ/:id", deleteFAQ);

module.exports = router;