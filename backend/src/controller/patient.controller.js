const pool = require("../db/mysql");
const crypto = require("crypto");

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
};

const verifyPassword = (password, storedPassword) => {
  if (!storedPassword) return false;

  if (!storedPassword.startsWith("scrypt:")) {
    return storedPassword === password;
  }

  const [, salt, hash] = storedPassword.split(":");
  const passwordHash = crypto.scryptSync(password, salt, 64);
  const storedHash = Buffer.from(hash, "hex");

  return (
    storedHash.length === passwordHash.length &&
    crypto.timingSafeEqual(storedHash, passwordHash)
  );
};

const removePassword = (patient) => {
  if (!patient) return patient;
  const { password, ...safePatient } = patient;
  return safePatient;
};

const findDuplicatePatient = async ({ name, email, phone }, patientId = null) => {
  const params = [email, phone, name, phone];
  let query = `
    SELECT id, name, email, phone
    FROM patient
    WHERE (email = ? OR phone = ? OR (LOWER(name) = LOWER(?) AND phone = ?))
  `;

  if (patientId) {
    query += " AND id != ?";
    params.push(patientId);
  }

  const [rows] = await pool.query(query, params);
  return rows[0];
};

const RegisterDetails = async (req, res) => {
    
  try {
    console.log(req.body);

    const { name, email, phone, password } = req.body;

    console.log(req.file);

    const duplicatePatient = await findDuplicatePatient({ name, email, phone });

    if (duplicatePatient) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Patient already registered with this email or phone number.",
      });
    }

    const hashedPassword = hashPassword(password);

    const [rows, fields, result] = await pool.query(
      "INSERT INTO patient(name,email,password,phone) VALUES(?,?,?,?)",
      [name, email, hashedPassword, phone],
    );

    res.status(200).json({
      success: true,
      data: { id: rows.insertId, name, email, phone },
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

    const [rows] = await pool.query("SELECT * FROM patient WHERE email=?", [
      email,
    ]);

    console.log(rows);

    let flag = false,
      patient = {};

    rows.map(async (v) => {
      if (v.email === email && verifyPassword(password, v.password)) {
        flag = true;
        patient = { ...v };

        if (!v.password.startsWith("scrypt:")) {
          await pool.query("UPDATE patient SET password=? WHERE id=?", [
            hashPassword(password),
            v.id,
          ]);
        }
      }
    });

    if (flag === true) {
      res.status(200).json({
        success: true,
        data: removePassword(patient),
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
    const [rows] = await pool.query(
      "SELECT id, name, email, phone, is_active, created_at, updated_at FROM patient"
    );

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
    
    const duplicatePatient = await findDuplicatePatient({ name, email, phone });

    if (duplicatePatient) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Patient already registered with this email or phone number.",
      });
    }

    const hashedPassword = hashPassword(password);

    const [rows] = await pool.query(
      "INSERT INTO patient(name, email, password, phone) VALUES (?,?,?,?)",
      [name, email, hashedPassword,phone]
    );

    res.status(200).json({
      success: true,
      data: {
        id: rows.insertId,
        name,
        email,
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

    const duplicatePatient = await findDuplicatePatient(
      { name, email, phone },
      patientId
    );

    if (duplicatePatient) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Patient already registered with this email or phone number.",
      });
    }

    const hashedPassword = hashPassword(password);

    await pool.query(
      "UPDATE patient SET name=?, email=?, password=?, phone=? WHERE id=?",
      [name, email, hashedPassword, phone, patientId]
    );

    res.status(200).json({
      success: true,
      data: { name, email, phone,id: patientId, },
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
