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

// GEt patient
const getPatient = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM patient");

    res.status(200).json({
      success: true,
      data: rows,
      message: "patient fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "patient not fetched",
    });
  }
};

// ADD BLOG
const addPatient = async (req, res) => {
  try {
    const { name, email, password,phone } = req.body;

    console.log(name, email, password,phone);
    

    const [rows] = await pool.query(
      "INSERT INTO patient(name, email, password, phone) VALUES (?,?,?,?)",
      [name, email, password,phone]
    );

    res.status(200).json({
      success: true,
      data: {
        id: rows.insertId,
        name,
        email,
        password,
        phone,
      },
      message: "patient added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "patient not added " + error.message,
    });
  }
};


// UPDATE BLOG
const updatePatient = async (req, res) => {
  try {
     console.log(req.body);
    const { name, email, password,phone} = req.body;
    const patientId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM patient WHERE id=${patientId}`
    );

      console.log(name,
      email,
      password,
      phone,
        )

   

    await pool.query(
      "UPDATE patient SET name=?, email=?, password=?, phone=? WHERE id=?",
      [name, email, password, phone, patientId]
    );

    res.status(200).json({
      success: true,
      data: { name, email, password, phone,id: patientId, },
      message: "patient updated successfully",
    });
     console.log(fields,results);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "patient not updated" + error.message,
    });
  }
};

// DELETE BLOG
const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM patient WHERE id=${patientId}`
    );

  //   fs.unlinkSync(rows[0].blog_img);
   
    await pool.query(`DELETE FROM patient WHERE id=${patientId}`);

    res.status(200).json({
      success: true,
      message: "patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "patient not deleted" + error.message,
    });
  }
};


module.exports = {
  RegisterDetails,
  login,
  getPatient,
  addPatient,
  updatePatient,
  deletePatient
};
