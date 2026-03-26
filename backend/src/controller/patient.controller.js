const pool = require("../db/mysql");

const RegisterDetails = async (req, res) => {
    
  try {
    console.log(req.body);

    const { name, email, phone, password } = req.body;

    console.log(req.file);

    const [rows, fields, result] = await pool.query(
      "INSERT INTO patient(name,email,password,phone) VALUES(?,?,?,?)",
      [name, email, password, phone],
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId },
      message: "patient added successfully",
    });

    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "patient not-added successfully" + error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const [rows] = await pool.query("SELECT * FROM patient");

    console.log(rows);

    let flag = false,
      patient = {};

    rows.map((v) => {
      if (v.email === email && v.password === password) {
        flag = true;
        patient = { ...v };
      }
    });

    if (flag === true) {
      res.status(200).json({
        success: true,
        data: patient,
        message: "Login successfully.",
      });
    } else {
      res.status(200).json({
        success: false,
        data: null,
        message: "Email/password wrong.",
      });
    }

    console.log(flag);
  } catch (error) {}
};

module.exports = {
  RegisterDetails,
  login,
};
