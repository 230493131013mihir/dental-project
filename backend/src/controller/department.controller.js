const pool = require("../db/mysql");

const getDepartment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM department");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "department fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "department not-fetched successfully"+ error.message,
    });
  }
};

const addDepartment = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id, name, description, mobile, email, address } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO department(branch_id, name, description, mobile, email, address) VALUES (?,?,?,?,?,?)",
      [branch_id, name, description, mobile, email, address],
    );
    res.status(200).json({
      success: true,
      data:  {...req.body, id: rows.insertId},
      message: "department added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "Internal Server Error (addDepartment)" + error.message,
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    console.log("req.body");

    const { branch_id, name, description, mobile, email, address } = req.body;

    const departmentId = req.params.id;

    console.log(branch_id, name, description, mobile, email, address);

    const [rows] = await pool.query(
      "UPDATE department SET branch_id = ?,name= ?,mobile= ?,address= ?,description= ? WHERE id=?",
      [branch_id, name, mobile, address, description, departmentId],
    );

    res.status(200).json({
      success: true,
      data: { branch_id, name, description, mobile, email, address,id:departmentId},
      message: "department update successfully",
    });
     console.log(fields,results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "department not-update successfully",
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    console.log(req.body);
    const departmentId = req.params.id;
    console.log(departmentId);

    const [rows, feild, result] = await pool.query(
      "DELETE FROM department WHERE id=?",
      [departmentId],
    );

    res.status(200).json({
      success: true,
      data: null,
      message: "department deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "department not-deleted successfully",
    });
  }
};

module.exports = {
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
