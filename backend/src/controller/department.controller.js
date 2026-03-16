const pool = require("../db/mysql");

const getDepartment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM department");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "rows added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "rows not-added successfully",
    });
  }
};

const addDepartment = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id, name, description, mobile, email, address } = req.body;

const [rows] = await pool.query(
  "INSERT INTO department(branch_id, name, description, mobile, email, address) VALUES (?,?,?,?,?,?)",
  [branch_id, name, description, mobile, email, address]
);
    res.status(200).json({
      success: true,
      data: req.body,
      message: "department added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "department not-added successfully",
    });
  }
};

const updateDepartment = () => {
  try {
    console.log("updateDepartment");
  } catch (error) {}
};

const deleteDepartment = () => {
  try {
    console.log("deleteDepartment");
  } catch (error) {}
};

module.exports = {
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
