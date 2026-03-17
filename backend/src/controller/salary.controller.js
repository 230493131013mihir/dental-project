const pool = require("../db/mysql");

const getSalary = async (req, res) => {
  try {

    const [rows] = await pool.query("SELECT * FROM salary");

    res.status(200).json({
      success: true,
      data: rows,
      message: "salary fetched successfully"
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      success: false,
      data: null,
      message: "salary not fetched successfully"
    });

  }
};

const addSalary = async (req, res) => {
  try {
    console.log(req.body);

const { user_id, payment_id, paymenttype, amount, status, workingdays } = req.body;

const [rows] = await pool.query(
  "INSERT INTO salary(user_id, payment_id, paymenttype, amount, status, workingdays) VALUES (?,?,?,?,?,?)",
  [user_id, payment_id, paymenttype, amount, status, workingdays]
);

    res.status(200).json({
      success: true,
      data: req.body,
      message: "salary fetched successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "salary not-fetched successfully",
    });
  }
};

const updateSalary = () => {
  try {
    console.log("updateSalary");
  } catch (error) {}
};

const deleteSalary = () => {
  try {
    console.log("deleteSalary");
  } catch (error) {}
};

module.exports = {
  getSalary,
  addSalary,
  updateSalary,
  deleteSalary,
};
