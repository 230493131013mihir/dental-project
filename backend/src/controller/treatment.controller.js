const pool = require("../db/mysql");

const getTreatment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM treatment");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "treatment fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "treatment not-fetched successfully",
    });
  }
};

const addTreatment = async (req, res) => {
  try {
    console.log(req.body);

const { appointment_id, disease, date, prescription, amount } = req.body;

const [rows] = await pool.query(
  "INSERT INTO treatment(appointment_id, disease, date, prescription, amount) VALUES (?,?,?,?,?)",
  [appointment_id, disease, date, prescription, amount]
);
    res.status(200).json({
      success: true,
      data:  {...req.body, id: rows.insertId},
      message: "treatment added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message:"server not found"+ error.message,
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
