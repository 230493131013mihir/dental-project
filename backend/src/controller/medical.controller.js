const pool = require("../db/mysql");

const getMedical = async (req, res) => {
  try {
    const [rows] =
      await pool.query(`SELECT appointment.id, name, phone, appointment.date, appointment.doctor_id, medicine_id, medicine_quantity, medicine_amount
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
      medicine_id,
      medicine_quantity,
      medicine_amount,
      status,
    } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO medical( name, phone, date, medicine_id,medicine_quantity,medicine_amount,status) VALUES (?,?,?,?,?,?,?)",
      [
        name,
        phone,
        date,
        medicine_id,
        medicine_quantity,
        medicine_amount,
        status,
      ],
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
      medicine_id,
      medicine_quantity,
      medicine_amount,
      status,
    } = req.body;

    const appointment_id = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM medical WHERE appointment_id=${appointment_id}`,
    );

    console.log("rows", rows, appointment_id);

    if (rows.length === 0) {
      const [rows] = await pool.query(
        "INSERT INTO medical( appointment_id, name, phone, date, medicine_id,medicine_quantity,medicine_amount,status) VALUES (?,?,?,?,?,?,?,?)",
        [
          appointment_id,
          name,
          phone,
          date,
          medicine_id,
          medicine_quantity,
          medicine_amount,
          status,
        ],
      );

      console.log("11111", rows);
    } else {
      const d = await pool.query(
        "UPDATE medical SET name= ?,phone= ?,date= ? ,medicine_id=?,medicine_quantity=?,medicine_amount=?,status=? WHERE appointment_id=?",
        [
          name,
          phone,
          date,
          medicine_id,
          medicine_quantity,
          medicine_amount,
          status,
          appointment_id,
        ],
      );

      console.log("222222222", d);
    }

    res.status(200).json({
      success: true,
      data: {
        name,
        phone,
        date,
        medicine_id,
        medicine_quantity,
        medicine_amount,
        status,
        id: appointment_id,
      },
      message: "medical update successfully",
    });
    // console.log(fields, results);
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
