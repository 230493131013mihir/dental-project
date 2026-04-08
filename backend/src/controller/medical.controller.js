const pool = require("../db/mysql");

const getMedical = async (req, res) => {
  try {
    const [rows] =
      await pool.query(`SELECT appointment.id, name, phone, appointment.date, time, appointment.doctor_id, medicine_id, medicine_quantity
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

const addMedical = async (req, res) => {
  try {
    console.log(req.body);

    const {
      name,
      phone,
      date,
      time,

      medicine_id,
      medicine_quantity,
      amount,
    } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO medical( name, phone, date, time,medicine_id,medicine_quantity,amount) VALUES (?,?,?,?,?,?,?)",
      [name, phone, date, time, medicine_id, medicine_quantity, amount],
    );
    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId },
      message: "medical added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "Internal Server Error (addMedical)" + error.message,
    });
  }
};

const updateMedical = async (req, res) => {
  try {
    console.log(req.body);

    const {
      name,
      phone,
      date,
      time,

      medicine_id,
      medicine_quantity,
      amount,
    } = req.body;

    const medicalId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM medical WHERE id=${medicalId}`,
    );

    console.log(
      name,
      phone,
      date,
      time,

      medicine_id,
      medicine_quantity,
      amount,
      medicalId,
    );

    await pool.query(
      "UPDATE medical SET name= ?,phone= ?,date= ?,time= ?,medicine_id=?,medicine_quantity=?,amount=? WHERE id=?",
      [
        name,
        phone,
        date,
        time,

        medicine_id,
        medicine_quantity,
        medicalId,
        amount,
      ],
    );

    res.status(200).json({
      success: true,
      data: {
        name,
        phone,
        date,
        time,
        medicine_id,
        medicine_quantity,
        amount,
        id: medicalId,
      },
      message: "medical update successfully",
    });
    console.log(fields, results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medical not-update successfully",
    });
  }
};

module.exports = {
  getMedical,
  addMedical,
  updateMedical,
};
