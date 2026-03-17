const pool = require("../db/mysql");

const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "user fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "user not-fetched successfully",
    });
  }
};

const addUser = async (req, res) => {
  try {
    console.log(req.body);

const { branch_id, department_id, role_id, name, dob, email, qualification, address } = req.body;

const [rows] = await pool.query(
  "INSERT INTO user(branch_id, department_id, role_id, name, dob, email, qualification, address) VALUES (?,?,?,?,?,?,?,?)",
  [branch_id, department_id, role_id, name, dob, email, qualification, address]
);
    res.status(200).json({
      success: true,
      data: req.body,
      message: "user added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "user not-added successfully",
    });
  }
};

const updateUser = () => {
  try {
    console.log("updateUser");
  } catch (error) {}
};

const deleteUser = () => {
  try {
    console.log("deleteUser");
  } catch (error) {}
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
