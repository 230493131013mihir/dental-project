const pool = require("../db/mysql");

const getSalary = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM salary");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "salary fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "salary not-fetched successfully",
    });
  }
};

const addSalary = async (req, res) => {
  try {
    console.log(req.body);

    const {
      user_id,
      payment_id,
      paymenttype,
      amount,
      status,
      workingdays,
    } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO salary(user_id,payment_id,paymenttype,amount,status,workingdays) VALUES(?,?,?,?,?,?)",
      [user_id, payment_id, paymenttype, amount, status, workingdays]
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId },
      message: "salary added successfully",
    });

    console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "salary not-added successfully" + error.message,
    });
  }
};

const updateSalary = async (req, res) => {
  try {
    console.log(req.body);

    const {
      user_id,
      payment_id,
      paymenttype,
      amount,
      status,
      workingdays,
    } = req.body;

    const salaryId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM salary WHERE id=${salaryId}`
    );

    console.log(
      user_id,
      payment_id,
      paymenttype,
      amount,
      status,
      workingdays,
      salaryId
    );

    await pool.query(
      "UPDATE salary SET user_id=?,payment_id=?,paymenttype=?,amount=?,status=?,workingdays=? WHERE id=?",
      [
        user_id,
        payment_id,
        paymenttype,
        amount,
        status,
        workingdays,
        salaryId,
      ]
    );

    res.status(200).json({
      success: true,
      data: {
        user_id,
        payment_id,
        paymenttype,
        amount,
        status,
        workingdays,
        id: salaryId,
      },
      message: "salary update successfully",
    });
    console.log(fields);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "salary not-update successfully",
    });
  }
};

const deleteSalary = async (req, res) => {
  try {
    const salaryId = req.params.id;

        const [rows] = await pool.query(
      `SELECT * FROM salary WHERE id=${salaryId}`,
    );


    console.log(salaryId);

    await pool.query(
      `DELETE FROM salary WHERE id=${salaryId}`,
      [salaryId]
    );

    res.status(200).json({
      success: true,
      data: null,
      message: "salary deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "salary not-deleted successfully" + error.message,
    });
  }
};

module.exports = {
  getSalary,
  addSalary,
  updateSalary,
  deleteSalary,
};