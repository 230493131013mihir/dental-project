const pool = require("../db/mysql");

const getExpence = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM expence");

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

const addExpence = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id,payment_id,paymenttype_id,type,amount,date } =
      req.body;

    const [rows, fields, result] = await pool.query(
      "INSERT INTO expence(branch_id,payment_id,paymenttype_id,type,amount,date) VALUES(?,?,?,?,?,?)",
      [branch_id,payment_id,paymenttype_id,type,amount,date],
    );

    res.status(200).json({
      success: true,
      data: req.body,
      message: "expence added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "expence not-added successfully",
    });
  }
};

const updateExpence = () => {
  try {
    console.log("updateExpence");
  } catch (error) {}
};

const deleteExpence = () => {
  try {
    console.log("deleteExpence");
  } catch (error) {}
};

module.exports = {
  getExpence,
  addExpence,
  updateExpence,
  deleteExpence,
};
