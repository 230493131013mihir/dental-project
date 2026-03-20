const pool = require("../db/mysql");
const fs = require("fs");
const getBranch = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM branch");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "branch fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "branch not-fetched successfully",
    });
  }
};

const addBranch = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, mobile_no, address, description, city, state } =
      req.body;

    console.log(req.file);

    const [rows, fields, result] = await pool.query(
      "INSERT INTO branch(name,email,mobile_no,address,description,city,state,branch_img) VALUES(?,?,?,?,?,?,?,?)",
      [
        name,
        email,
        mobile_no,
        address,
        description,
        city,
        state,
        req.file.path,
      ],
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId, branch_img: req.file.path },
      message: "branch added successfully",
    });

    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "branch not-added successfully"+ error.message,
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, mobile_no, address, description, city, state } =
      req.body;

    const branchId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM branch WHERE id=${branchId}`,
    );
    console.log(
      name,
      email,
      mobile_no,
      address,
      description,
      city,
      state,
      branchId,
      rows[0].branch_img,
    );

    let fileImg = "";
    if (req.file) {
      fs.unlinkSync(rows[0].branch_img, (error) => {
        console.log(error);
      });
      fileImg = req.file.path;
    } else {
      fileImg = rows[0].branch_img;
    }

    // const [rows,fields] =
    await pool.query(
      "UPDATE branch SET name = ?,email= ?,mobile_no= ?,address= ?,description= ?,city= ?,state=?,branch_img=? WHERE id=?",
      [
        name,
        email,
        mobile_no,
        address,
        description,
        city,
        state,
        fileImg,
        branchId,
      ],
    );

    res.status(200).json({
      success: true,
      data: {
        name,
        email,
        mobile_no,
        address,
        description,
        city,
        state,
        branch_img: fileImg,
        id: branchId,
      },
      message: "branch update successfully",
    });

    console.log(fields);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "branch not-update successfully",
    });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const branchId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM branch WHERE id=${branchId}`,
    );

    fs.unlinkSync(rows[0].branch_img, (error) => {
      console.log(error);
    });
    

    console.log(branchId);

    await pool.query(
      `DELETE FROM branch WHERE id=${branchId}`,
      [branchId],
    );

    res.status(200).json({
      success: true,
      data: null,
      message: "branch deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "branch not-deleted successfully" + error.message,
    });
  }
};

module.exports = {
  getBranch,
  addBranch,
  updateBranch,
  deleteBranch,
};
