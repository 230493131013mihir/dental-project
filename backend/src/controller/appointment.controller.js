const pool = require("../db/mysql");

const getAppointment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM appointment");

    console.log("aqaqaq",rows);
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
      message: "appointment not-fetched successfully" + error.message,
    });
  }
};

const getMyAppointment = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const [rows] = await pool.query(
      `SELECT * FROM appointment WHERE user_id=${user_id}`,
    );

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
      message: "appointment not-fetched successfully" + error.message,
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    console.log(req.body);

    const {
      branch_id,
      department_id,
      doctor_id,
      name,
      phone,
      date,
      time,
      user_id = 0,
    } = req.body;

    console.log(
      branch_id,
      department_id,
      doctor_id,
      name,
      phone,
      date,
      time,
      user_id,
    );

    const [rows, fields, result] = await pool.query(
      "INSERT INTO appointment(branch_id, department_id, user_id,doctor_id, name, phone , date, time ) VALUES(?,?,?,?,?,?,?,?)",
      [branch_id, department_id, user_id ?? 0, doctor_id, name, phone, date, time],
    );

    const appointpatientD = await pool.query(
      `SELECT appointpatient FROM timeslot WHERE id=${time}`,
    );

    console.log("timeSlotData", appointpatientD[0][0]?.appointpatient);

    await pool.query("UPDATE timeslot SET appointpatient=? WHERE id=?", [
      appointpatientD[0][0]?.appointpatient + 1,
      time,
    ]);

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

// const addTreatment = async (req, res) => {
//   try {
//     console.log(req.body);

//     console.log("okok");

//     const { date, prescription, treatement_amount, medicines, appointment_id } =
//       req.body;

//     console.log("BODY:", req.body);

//     if (!Array.isArray(medicines)) {
//       return res.status(400).json({
//         message: "Medicines must be array",
//       });
//     }

//     const treatmentQuery = `
//       INSERT INTO treatment (appointment_id, date, prescription, treatement_amount)
//       VALUES (?, ?, ?, ?)
//     `;

//     await pool.query(
//       treatmentQuery,
//       [appointment_id, date, prescription, treatement_amount],
//       async (err, result) => {

//         console.log("ooooppppp");
        
//         if (err) {
//           console.log("SQL ERROR 1:", err);
//           return res.status(500).json({ error: err.message });
//         }

//         console.log("resulrt", result, medicines);
        

//         const treatmentId = result.insertId;

//         const medicineValues = medicines.map((med) => [
//           treatmentId,
//           med.medicine_id,
//           med.medicine_amount,
//           med.medicine_quantity,
//         ]);

//         console.log("ggg", medicineValues);
        

//         const medicineQuery = `
//           INSERT INTO treatment_medicines
//           (treatment_id, medicine_id, medicine_amount, medicine_quantity)
//           VALUES ?
//         `;

//         await pool.query(medicineQuery, [medicineValues], (err2) => {
//           if (err2) {
//             console.log("SQL ERROR 2:", err2);
//             return res.status(500).json({ error: err2.message });
//           }

//           return res.json({
//             success: true,
//             message: "Treatment added successfully",
//             treatment_id: treatmentId,
//           });
//         });
//       },
//     );

//     // const { appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity } = req.body;

//     // console.log(appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity );

//     // const [rows, fields, result] = await pool.query(
//     //   "INSERT INTO treatment (appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity ) VALUES(?,?,?,?,?,?,?)",
//     //   [appointment_id, medicine_id, medicine_amount, date, prescription, treatement_amount, medicine_quantity ],
//     // );

//     // res.status(200).json({
//     //   success: true,
//     //   data: { ...req.body, id: rows.insertId },
//     //   message: "treatement  added successfully",
//     // });

//     // console.log(rows, fields, result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: true,
//       data: null,
//       message: "treatement  not-added successfully" + error.message,
//     });
//   }
// };

const addTreatment = async (req, res) => {
  // Use the pool directly since you imported from 'mysql2/promise'
  const db = require("../db/mysql"); 

  // 1. Get a connection from the pool to handle the transaction
  const connection = await db.getConnection();

  try {
    const {
      date,
      prescription,
      treatement_amount,
      medicines,
      appointment_id,
      actor_user_id,
    } = req.body;

    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ message: "Medicines must be a non-empty array" });
    }

    if (!appointment_id) {
      return res.status(400).json({
        success: false,
        message: "Appointment is required",
      });
    }

    if (!actor_user_id) {
      return res.status(401).json({
        success: false,
        message: "Please login as staff before adding prescription",
      });
    }

    const [[appointment]] = await connection.query(
      "SELECT id, doctor_id FROM appointment WHERE id=?",
      [appointment_id]
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const [[actor]] = await connection.query(
      "SELECT id, role_id FROM user WHERE id=?",
      [actor_user_id]
    );

    if (!actor) {
      return res.status(401).json({
        success: false,
        message: "Please login as staff before adding prescription",
      });
    }

    const isAdmin = actor.role_id === "Admin";
    const isAssignedDoctor =
      actor.role_id === "Doctor" && actor.id == appointment.doctor_id;

    if (!isAdmin && !isAssignedDoctor) {
      return res.status(403).json({
        success: false,
        message: "Only the assigned doctor can edit this prescription",
      });
    }

    // 2. Start Transaction
    await connection.beginTransaction();

    // 3. Insert Treatment
    const [treatmentResult] = await connection.query(
      `INSERT INTO treatment (appointment_id, date, prescription, treatement_amount)
       VALUES (?, ?, ?, ?)`,
      [appointment_id, date, prescription, treatement_amount]
    );

    const treatmentId = treatmentResult.insertId;

    // 4. Prepare Medicines (Array of Arrays)
    const medicineValues = medicines.map((med) => [
      treatmentId,
      med.medicine_id,
      med.medicine_amount,
      med.medicine_quantity,
      "pending"
    ]);

    // 5. Bulk Insert Medicines
    // Note: medicineValues is wrapped in an extra array [medicineValues]
    await connection.query(
      `INSERT INTO treatment_medicines
       (treatment_id, medicine_id, medicine_amount, medicine_quantity, status)
       VALUES ?`,
      [medicineValues]
    );

    // 6. Commit the changes
    await connection.commit();

    return res.json({
      success: true,
      message: "Treatment and medicines added successfully",
      treatment_id: treatmentId,
    });

  } catch (error) {
    // 7. If anything fails, rollback the treatment insert too
    await connection.rollback();
    console.error("🔥 DATABASE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // 8. Always release the connection back to the pool
    connection.release();
  }
};

module.exports = {
  bookAppointment,
  getAppointment,
  addTreatment,
  getMyAppointment,
};
