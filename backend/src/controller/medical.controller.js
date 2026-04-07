const pool = require("../db/mysql");

const getMedical = async (req, res) => {
  try {
    const [rows] =
      await pool.query(`SELECT appointment.id, name, phone, appointment.date, time, doctor_id, medicine_id, medicine_quantity
                       FROM appointment
                       INNER JOIN treatment
                       ON appointment.id = treatment.appointment_id;`);

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "medical fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medical not-fetched successfully" + error.message,
    });
  }
};

module.exports = {
  getMedical
};
