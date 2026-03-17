const pool = require("../db/mysql");

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

    const [rows, fields, result] = await pool.query(
      "INSERT INTO branch(name,email,mobile_no,address,description,city,state) VALUES(?,?,?,?,?,?,?)",
      [name, email, mobile_no, address, description, city, state],
    );

    res.status(200).json({
      success: true,
      data: req.body,
      message: "branch added successfully",
    });

    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "branch not-added successfully",
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, mobile_no, address, description, city, state } =
      req.body;

    const branchId = req.params.id;
    console.log(
      name,
      email,
      mobile_no,
      address,
      description,
      city,
      state,
      branchId,
    );

    const [rows] = await pool.query(
      "UPDATE branch SET name = ?,email= ?,mobile_no= ?,address= ?,description= ?,city= ?,state=? WHERE id=?",
      [name, email, mobile_no, address, description, city, state, branchId],
    );

    res.status(200).json({
      success: true,
      data: req.body,
      message: "branch update successfully",
    });

    console.log(rows);
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

    console.log(branchId);

    const [rows, feilds, result] = await pool.query(
      "DELETE FROM branch WHERE id=?",
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
      message: "branch not-deleted successfully",
    });
  }
};

module.exports = {
  getBranch,
  addBranch,
  updateBranch,
  deleteBranch,
};
