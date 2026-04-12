
const pool = require("../db/mysql");

const getAppointment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM appointment");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "appointment fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "appointment not-fetched successfully"+ error.message,
    });
  }
};

const getMyAppointment = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const [rows] = await pool.query(`SELECT * FROM appointment WHERE user_id=${user_id}`);

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "appointment fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "appointment not-fetched successfully"+ error.message,
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id, department_id,doctor_id, name, phone, date, time, user_id } = req.body;

    console.log(branch_id, department_id,doctor_id, name, phone, date, time);

    const [rows, fields, result] = await pool.query(
      "INSERT INTO appointment(branch_id, department_id,doctor_id, user_id, name, phone , date, time ) VALUES(?,?,?,?,?,?,?,?)",
      [branch_id, department_id,doctor_id, user_id, name, phone, date, time],
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId },
      message: "appointment added successfully",
    });

    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "appointment not-added successfully" + error.message,
    });
  }
};

const addTreatment = async (req, res) => {
  try {
    console.log(req.body);

    const { appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity } = req.body;

    console.log(appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity );

    const [rows, fields, result] = await pool.query(
      "INSERT INTO treatment (appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity ) VALUES(?,?,?,?,?,?,?)",
      [appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity ],
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId },
      message: "treatement  added successfully",
    });

    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "treatement  not-added successfully" + error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getAppointment,
  addTreatment,
  getMyAppointment
};
