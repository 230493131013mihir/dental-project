
const pool = require("../db/mysql");
const fs = require("fs");

// GET BLOG
const getBlog = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM blog");

    res.status(200).json({
      success: true,
      data: rows,
      message: "blog fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "blog not fetched",
    });
  }
};

// ADD BLOG
const addBlog = async (req, res) => {
  try {
    const { name, description, date } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO blog(name, description, date, blog_img) VALUES (?,?,?,?)",
      [name, description, date, req.file.path]
    );

    res.status(200).json({
      success: true,
      data: {
        id: rows.insertId,
        name,
        description,
        date,
        blog_img: req.file.path,
      },
      message: "blog added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "blog not added " + error.message,
    });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const blogId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM blog WHERE id=${blogId}`
    );

    let fileImg = rows[0].blog_img;

    if (req.file) {
      fs.unlinkSync(rows[0].blog_img);
      fileImg = req.file.path;
    }

    await pool.query(
      "UPDATE blog SET name=?, description=?, date=?, blog_img=? WHERE id=?",
      [name, description, date, fileImg, blogId]
    );

    res.status(200).json({
      success: true,
      data: { id: blogId, name, description, date, blog_img: fileImg },
      message: "blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "blog not updated",
    });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM blog WHERE id=${blogId}`
    );

    fs.unlinkSync(rows[0].blog_img);

    await pool.query(`DELETE FROM blog WHERE id=${blogId}`);

    res.status(200).json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "blog not deleted",
    });
  }
};

module.exports = {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
};