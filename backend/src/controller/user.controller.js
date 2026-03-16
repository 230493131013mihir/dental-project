const pool = require("../db/mysql");

const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");

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

const addUser = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id,payment_id,paymenttype_id,type,amount,date } =
      req.body;

    const [rows, fields, result] = await pool.query(
      "INSERT INTO user(branch_id,payment_id,paymenttype_id,type,amount,date) VALUES(?,?,?,?,?,?)",
      [branch_id,payment_id,paymenttype_id,type,amount,date],
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
