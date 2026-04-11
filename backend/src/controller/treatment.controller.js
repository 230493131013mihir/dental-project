const pool = require("../db/mysql");
const fs = require("fs");

const getTreatment = async (req, res) => {
  try {
    const [rows] = await pool.query(`
    SELECT treatment.id, appointment_id, date, prescription, treatement_amount, medicine_id, medicine_amount, medicine_quantity 
FROM treatment
INNER JOIN treatment_medicines
ON treatment.id = treatment_medicines.treatment_id
  
      
    `);

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
    console.log("okok");

    const {
      date,
      prescription,
      treatement_amount,
      medicines,
      
      appointment_id,
    } = req.body;

    console.log("BODY:", req.body);

    if (!Array.isArray(medicines)) {
      return res.status(400).json({
        message: "Medicines must be array",
      });
    }

    const treatmentQuery = `
      INSERT INTO treatment (appointment_id, date, prescription, treatement_amount)
      VALUES (?, ?, ?, ?)
    `;

    pool.query(
      treatmentQuery,
      [appointment_id, date, prescription, treatement_amount],
      (err, result) => {
        if (err) {
          console.log("SQL ERROR 1:", err);
          return res.status(500).json({ error: err.message });
        }

        const treatmentId = result.insertId;

        const medicineValues = medicines.map((med) => [
          treatmentId,
          med.medicine_id,
          med.medicine_amount,
          med.medicine_quantity,
        ]);

        const medicineQuery = `
          INSERT INTO treatment_medicines
          (treatment_id, medicine_id, medicine_amount, medicine_quantity)
          VALUES ?
        `;

        pool.query(medicineQuery, [medicineValues], (err2) => {
          if (err2) {
            console.log("SQL ERROR 2:", err2);
            return res.status(500).json({ error: err2.message });
          }

          return res.json({
            success: true,
            message: "Treatment added successfully",
            treatment_id: treatmentId,
          });
        });
      }
    );
  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
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
