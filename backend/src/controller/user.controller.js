const pool = require("../db/mysql");
const fs = require("fs");
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

const removePassword = (user) => {
  if (!user) return user;
  const { password, ...safeUser } = user;
  return safeUser;
};

const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, branch_id, department_id, role_id, name, dob, email, qualification, address, salary, user_img, is_active, created_at, updated_at FROM user"
    );

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "user fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "user not-fetched successfully" + error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    console.log(req.body);

    const {
      branch_id,
      department_id,
      role_id,
      name,
      dob,
      email,
      password,
      qualification,
      address,
      salary,
    } = req.body;

    console.log(req.file);

    const hashedPassword = hashPassword(password || "123456");

    const [rows] = await pool.query(
      "INSERT INTO user(branch_id,department_id,role_id,name,dob,email,password,qualification,address,salary,user_img) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [
        branch_id,
        department_id,
        role_id,
        name,
        dob,
        email,
        hashedPassword,
        qualification,
        address,
        salary,
        req.file.path,
      ]
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId, user_img: req.file.path },
      message: "user added successfully",
    });

    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "user not-added successfully" + error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body);

    const {
      branch_id,
      department_id,
      role_id,
      name,
      dob,
      email,
      password,
      qualification,
      address,
      salary,
    } = req.body;

    const userId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM user WHERE id=${userId}`
    );

    console.log(branch_id,
      department_id,
      role_id,
      name,
      dob,
      email,
      qualification,
      address,
      salary,
      rows[0].user_img,
    )

     let fileImg = "";
              if (req.file) {
                fs.unlinkSync(rows[0].user_img, (error) => {
                  console.log(error);
                });
                fileImg = req.file.path;
              } else {
                fileImg = rows[0].user_img;
              }

    const values = [
        branch_id,
        department_id,
        role_id,
        name,
        dob,
        email,
    ];

    let updateQuery =
      "UPDATE user SET branch_id=?,department_id=?,role_id=?,name=?,dob=?,email=?";

    if (password) {
      updateQuery += ",password=?";
      values.push(hashPassword(password));
    }

    updateQuery +=
      ",qualification=?,address=?,salary=?,user_img=? WHERE id=?";
    values.push(qualification, address, salary, fileImg, userId);

    await pool.query(updateQuery, values);

    res.status(200).json({
      success: true,
      data: {
        branch_id,
        department_id,
        role_id,
        name,
        dob,
        email,
        qualification,
        address,
        salary,
        user_img: fileImg,
        id: userId,
      },
      message: "user update successfully",
    });
     console.log(fields,results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "user not-update successfully",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM user WHERE id=${userId}`
    );

      fs.unlinkSync(rows[0].user_img, (error) => {
               console.log(error);
             });
   
              console.log(userId);

    await pool.query(
      `DELETE FROM user WHERE id=${userId}`);

    res.status(200).json({
      success: true,
      data: null,
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "user not-deleted successfully" + error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM user WHERE email=?", [
      email,
    ]);
    const user = rows.find((item) => verifyPassword(password, item.password));

    if (!user) {
      return res.status(200).json({
        success: false,
        data: null,
        message: "Email/password wrong.",
      });
    }

    if (!user.password.startsWith("scrypt:")) {
      await pool.query("UPDATE user SET password=? WHERE id=?", [
        hashPassword(password),
        user.id,
      ]);
    }

    return res.status(200).json({
      success: true,
      data: removePassword(user),
      message: "Login successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Login failed " + error.message,
    });
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  login,
};
