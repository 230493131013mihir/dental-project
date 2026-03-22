const pool = require("../db/mysql");
const fs = require("fs");

const getMedicine = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM medicine");

    res.status(200).json({
      success: true,
      data: rows,
      message: "medicine fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medicine not-fetched successfully",
    });
  }
};

const addMedicine = async (req, res) => {
  try {
    const {
      branch_id,
      vendor_id,
      department_id,
      name,
      description,
      price,
      stock,
      expirydate,
    } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO medicine(branch_id,vendor_id,department_id,name,description,price,stock,medicine_img,expirydate) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        branch_id,
        vendor_id,
        department_id,
        name,
        description,
        price,
        stock,
        req.file.path,
        expirydate,
      ]
    );

    res.status(200).json({
      success: true,
      data: {
        ...req.body,
        id: rows.insertId,
        medicine_img: req.file.path,
      },
      message: "medicine added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medicine not-added successfully",
    });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const {
      branch_id,
      vendor_id,
      department_id,
      name,
      description,
      price,
      stock,
      expirydate,
    } = req.body;

    const medicineId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM medicine WHERE id=${medicineId}`
    );

    let fileImg = "";
    if (req.file) {
      try {
        fs.unlinkSync(rows[0].medicine_img);
      } catch (err) {
        console.log(err);
      }
      fileImg = req.file.path;
    } else {
      fileImg = rows[0].medicine_img;
    }

    await pool.query(
      "UPDATE medicine SET branch_id=?,vendor_id=?,department_id=?,name=?,description=?,price=?,stock=?,medicine_img=?,expirydate=? WHERE id=?",
      [
        branch_id,
        vendor_id,
        department_id,
        name,
        description,
        price,
        stock,
        fileImg,
        expirydate,
        medicineId,
      ]
    );

    res.status(200).json({
      success: true,
      data: {
        branch_id,
        vendor_id,
        department_id,
        name,
        description,
        price,
        stock,
        expirydate,
        medicine_img: fileImg,
        id: medicineId,
      },
      message: "medicine update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medicine not-update successfully",
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicineId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM medicine WHERE id=${medicineId}`
    );

    try {
      fs.unlinkSync(rows[0].medicine_img);
    } catch (err) {
      console.log(err);
    }

    await pool.query(`DELETE FROM medicine WHERE id=${medicineId}`);

    res.status(200).json({
      success: true,
      data: null,
      message: "medicine deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medicine not-deleted successfully",
    });
  }
};

module.exports = {
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
};