const pool = require("../db/mysql");
const fs = require("fs");
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

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO department(branch_id, name, description, mobile, email, address,department_img) VALUES (?,?,?,?,?,?)",
      [branch_id, name, description, mobile, email, address, req.file.path],
    );
    res.status(200).json({
      success: true,
      data:  {...req.body, id: rows.insertId,department_img: req.file.path},
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

     const [rows] = await pool.query(
      `SELECT * FROM department WHERE id=${departmentId}`,);

    console.log(branch_id, name, description, mobile, email, address);

     let fileImg = "";
        if (req.file) {
          fs.unlinkSync(rows[0].department_img, (error) => {
            console.log(error);
          });
          fileImg = req.file.path;
        } else {
          fileImg = rows[0].branch_img;
        }

    await pool.query(
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

     const [rows] = await pool.query(
      `SELECT * FROM department WHERE id=${departmentId}`,
    );

    fs.unlinkSync(rows[0].department_img, (error) => {
      console.log(error);
    });
    console.log(departmentId);

    await pool.query(
      `DELETE FROM department WHERE id=${departmentId}`,
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
      message: "department not-deleted successfully"+ error.message,
    });
  }
};

module.exports = {
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
