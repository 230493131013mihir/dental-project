const pool = require("../db/mysql");

// MAIN DASHBOARD
const getDashboard = async (req, res) => {
  try {
    const [totalPatient] = await pool.query(
      "SELECT COUNT(id) AS totalPatient FROM patient"
    );

    const [totalApt] = await pool.query(
      "SELECT COUNT(id) AS totalApt FROM appointment"
    );

    const [totalMedicine] = await pool.query(
      "SELECT COUNT(id) AS totalMedicine FROM medicine"
    );

    const [revenue] = await pool.query(`
      SELECT 
        SUM(
          t.treatement_amount + (tm.medicine_amount * tm.medicine_quantity)
        ) AS total_revenue
      FROM treatment t
      LEFT JOIN treatment_medicines tm 
        ON t.id = tm.treatment_id
      WHERE t.is_active = 1;
    `);

    const [medicineRevenue] = await pool.query(`
      SELECT 
        SUM(medicine_amount * medicine_quantity) AS medicine_revenue
      FROM treatment_medicines
      WHERE is_active = 1;
    `);

    const [payments] = await pool.query(`
      SELECT
        COUNT(id) AS totalPayments,
        SUM(amount) AS paymentRevenue
      FROM payment
      WHERE status = 'paid';
    `);

    res.json({
      success: true,
      data: {
        totalPatient: totalPatient[0]?.totalPatient || 0,
        totalAppointment: totalApt[0]?.totalApt || 0,
        totalMedicine: totalMedicine[0]?.totalMedicine || 0,
        totalRevenue: revenue[0]?.total_revenue || 0,
        medicineRevenue: medicineRevenue[0]?.medicine_revenue || 0,
        totalPayments: payments[0]?.totalPayments || 0,
        paymentRevenue: payments[0]?.paymentRevenue || 0,
      },
    });

  } catch (err) {
    console.log("Dashboard Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// TREND
const getAppointmentTrend = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        DATE_FORMAT(date, '%b') AS name,
        COUNT(*) AS value
        FROM appointment
        GROUP BY MONTH(date), YEAR(date)
        ORDER BY YEAR(date), MONTH(date)
    `);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.log("Trend Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// APPOINTMENTS
const getAppointmentsList = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.id, a.name AS patient_name, a.phone, a.date, b.name AS branch_name, d.name AS department_name, t.starttime, t.endtime
        FROM appointment a
        INNER JOIN branch b
        ON a.branch_id = b.id
        INNER JOIN department d
        ON a.department_id = d.id
        INNER JOIN timeslot t
        ON a.time = t.id;
    `);

    console.log("rowsrowsrowsrows", rows);
    


    res.json({ success: true, data: rows });
  } catch (err) {
    console.log("Appointments Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const branchWiseRevenue = async (req, res) => {
    try {
    const [rows] = await pool.query(`
      SELECT 
            b.id,
            b.name AS branch_name,
            SUM(t.treatement_amount) AS total_amount
        FROM branch b
        LEFT JOIN appointment a ON a.branch_id = b.id
        LEFT JOIN treatment t ON t.appointment_id = a.id
        GROUP BY b.id, b.name
    `);

    console.log("rowsrowsrowsrows", rows);
    


    res.json({ success: true, data: rows });
  } catch (err) {
    console.log("Appointments Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getDashboard,
  getAppointmentTrend,
  getAppointmentsList,
  branchWiseRevenue
};
