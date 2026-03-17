const pool = require("../db/mysql");

const getExpence = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM expence");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "expence fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "expence not-fetched successfully",
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

const updateExpence = async (req, res) => {
  try {
    console.log("req.body");

    const { branch_id,payment_id,paymenttype_id,type,amount,date} = req.body;

    const expenceId = req.params.id;

    console.log(branch_id,payment_id,paymenttype_id,type,amount,date);

    const [rows] = await pool.query(
      "UPDATE expence SET branch_id = ?,payment_id= ?,paymenttype_id= ?,type= ?,amount= ?,date= ? WHERE id=?",
      [branch_id, payment_id, paymenttype_id, type, amount, date],
    );

    res.status(200).json({
      success: true,
      data: req.body,
      message: "expence update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "expence not-update successfully",
    });
  }
};

const deleteExpence = async (req, res) => {
  try {
    console.log(req.body);
    const expenceId = req.params.id;
    console.log(expenceId);

    const [rows, feild, result] = await pool.query(
      "DELETE FROM expence WHERE id=?",
      [expenceId],
    );

    res.status(200).json({
      success: true,
      data: null,
      message: "expence deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "expence not-deleted successfully",
    });
  }
};

module.exports = {
  getExpence,
  addExpence,
  updateExpence,
  deleteExpence,
};
