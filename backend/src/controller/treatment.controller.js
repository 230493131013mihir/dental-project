const pool = require("../db/mysql");

const getTreatment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM treatment");

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

const addTreatment = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id,payment_id,paymenttype_id,type,amount,date } =
      req.body;

    const [rows, fields, result] = await pool.query(
      "INSERT INTO treatment(branch_id,payment_id,paymenttype_id,type,amount,date) VALUES(?,?,?,?,?,?)",
      [branch_id,payment_id,paymenttype_id,type,amount,date],
    );

    res.status(200).json({
      success: true,
      data: req.body,
      message: "treatment added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "treatment not-added successfully",
    });
  }
};

const updateTreatment = () => {
  try {
    console.log("updateTreatment");
  } catch (error) {}
};

const deleteTreatment = () => {
  try {
    console.log("deleteTreatment");
  } catch (error) {}
};

module.exports = {
  getTreatment,
  addTreatment,
  updateTreatment,
  deleteTreatment,
};
