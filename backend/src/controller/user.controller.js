const pool = require("../db/mysql");
const fs = require("fs");

const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");

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
      qualification,
      address,
      salary,
    } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO user(branch_id,department_id,role_id,name,dob,email,qualification,address,salary,user_img) VALUES(?,?,?,?,?,?,?,?,?,?)",
      [
        branch_id,
        department_id,
        role_id,
        name,
        dob,
        email,
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

    await pool.query(
      "UPDATE user SET branch_id=?,department_id=?,role_id=?,name=?,dob=?,email=?,qualification=?,address=?,salary=?,user_img=? WHERE id=?",
      [
        branch_id,
        department_id,
        role_id,
        name,
        dob,
        email,
        qualification,
        address,
        salary,
        fileImg,
        userId,
      ]
    );

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

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};