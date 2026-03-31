const express = require("express");
const {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");

const upload = require("../middleware/upload");

const router = express.Router();

router.get("/getBlog", getBlog);
router.post("/addBlog", upload.single("blog_img"), addBlog);
router.put("/updateBlog/:id", upload.single("blog_img"), updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;