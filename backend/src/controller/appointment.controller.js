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

const bookAppointment = async (req, res) => {
  try {
    console.log(req.body);

    const { branch, department, name, phone, date, time } = req.body;

    console.log(branch, department, name, phone, date, time);

    const [rows, fields, result] = await pool.query(
      "INSERT INTO appointment(branch, department, name, phone , date, time ) VALUES(?,?,?,?,?,?)",
      [branch, department, name, phone, date, time],
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

module.exports = {
  bookAppointment,
  getAppointment

};
