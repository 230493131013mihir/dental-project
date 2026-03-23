const pool = require("../db/mysql");
const fs = require("fs");

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
      message: "treatment not-fetched successfully" + error.message,
    });
  }
};

const addTreatment = async (req, res) => {
  try {
    console.log(req.body);

    const { appointment_id, date, amount, prescription, disease } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO treatment(appointment_id, date4, amount, prescription, disease,treatment_img) VALUES (?,?,?,?,?,?)",
      [appointment_id, date, amount, prescription, disease, req.file.path],
    );
    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId, treatment_img: req.file.path },
      message: "treatment added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "Internal Server Error)" + error.message,
    });
  }
};

const updateTreatment = async (req, res) => {
  try {
    console.log(req.body);

    const { appointment_id, date, amount, prescription, disease } = req.body;

    const treatmentId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM treatment WHERE id=${treatmentId}`,
    );

    console.log(
      appointment_id,
      date,
      amount,
      prescription,
      disease,
      rows[0].treatment_img,
    );

    let fileImg = "";
    if (req.file) {
      fs.unlinkSync(rows[0].treatment_img, (error) => {
        console.log(error);
      });
      fileImg = req.file.path;
    } else {
      fileImg = rows[0].treatment_img;
    }

    await pool.query(
      "UPDATE treatment SET appointment_id = ?,date= ?,amount= ?,prescription= ?,disease= ?,treatment_img=? WHERE id=?",
      [
        appointment_id,
        date,
        amount,
        prescription,
        disease,
        fileImg,
        treatmentId,
      ],
    );

    res.status(200).json({
      success: true,
      data: {
        appointment_id,
        date,
        amount,
        prescription,
        disease,
        fileImg,
        treatmentId,
        treatment_img: fileImg,
        id: treatmentId,
      },
      message: "treatment update successfully",
    });
    console.log(fields, results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "treatment not-update successfully",
    });
  }
};

const deleteTreatment = async (req, res) => {
  try {
    // console.log(req.body);
    const treatmentId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM treatment WHERE id=${treatmentId}`,
    );

    fs.unlinkSync(rows[0].treatment_img, (error) => {
      console.log(error);
    });

    console.log(treatmentId);

    await pool.query(`DELETE FROM treatment WHERE id=${treatmentId}`);

    res.status(200).json({
      success: true,
      data: null,
      message: "treatment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "treatment not-deleted successfully" + error.message,
    });
  }
};

module.exports = {
  getTreatment,
  addTreatment,
  updateTreatment,
  deleteTreatment,
};
