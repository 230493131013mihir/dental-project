const pool = require("../db/mysql");

const getMedical = async (req, res) => {
  try {
    const [rows] =
      await pool.query(`SELECT 
    tm.id AS "id", -- This is your unique key for the React DataGrid
    COALESCE(a.id, m.appointment_id) AS "id",
    COALESCE(a.name, m.name) AS "name",
    COALESCE(a.phone, m.phone) AS "phone",
    COALESCE(a.date, m.date) AS "date",
    a.doctor_id AS "doctor_id",
    tm.medicine_id AS "medicine_id",
    tm.medicine_quantity AS "medicine_quantity",
    tm.medicine_amount AS "medicine_amount",
    tm.status AS "status",
    t.id AS "treatment_id"
FROM 
    treatment_medicines tm
LEFT JOIN 
    treatment t ON tm.treatment_id = t.id
LEFT JOIN 
    appointment a ON t.appointment_id = a.id
LEFT JOIN 
    medical m ON tm.medical_id = m.id`);

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

    console.log("name, phone, date,status", name, phone, date,status);

    const [rows] = await pool.query(
      "INSERT INTO medical(name, phone, date,status) VALUES (?,?,?,?)",
      [
        name,
        phone,
        date,
        status,
      ],
    );

    console.log("rowsrows",rows);
    

    await pool.query(
      "INSERT INTO treatment_medicines(medical_id, medicine_id, medicine_quantity, medicine_amount) VALUES (?,?,?,?)",
      [rows?.insertId,medicine_id, medicine_quantity, medicine_amount]
    )

    const meD = await pool.query("SELECT * FROM medicine WHERE id=?", [medicine_id])

    console.log(meD[0][0].sell_qty, "meDmeD");
    
    await pool.query(
      "UPDATE medicine SET sell_qty=? WHERE id=?", [meD[0][0].sell_qty + parseInt(medicine_quantity), medicine_id]
    )


    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId },
      message: "medical added successfully",
    });
    // console.log(rows, fields, result);
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
      treatment_id
    } = req.body;

    const appointment_id = req.params.id;

    await pool.query(
      "UPDATE treatment_medicines SET status=? WHERE id=?",
      ["complete", treatment_id]
    );

    const [rows] = await pool.query(
      `SELECT * FROM medical WHERE appointment_id=${appointment_id}`,
    );

    console.log("rows", rows, appointment_id);

    if (rows.length === 0) {
      const [rows] = await pool.query(
        "INSERT INTO medical( treatment_id, name, phone, date, status) VALUES (?,?,?,?,?)",
        [
          treatment_id,
          name,
          phone,
          date,
          status,
        ],
      );

      console.log("11111", rows);
    } else {
      const d = await pool.query(
        "UPDATE medical SET name= ?,phone= ?,date= ?,status=? WHERE treatment_id=?",
        [
          name,
          phone,
          date,
          status,
          treatment_id,
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
        treatment_id: treatment_id,
      },
      message: "medical update successfully",
    });
    // console.log(fields, results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medical not-update successfully" + error.message,
    });
  }
};

module.exports = {
  getMedical,
  addMedical,
  updateMedical,
};
