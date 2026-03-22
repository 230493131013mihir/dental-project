const pool = require("../db/mysql");
const fs = require("fs");

const getVendor = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vendor");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "vendor fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "vendor not-fetched successfully" + error.message,
    });
  }
};

const addVendor = async (req, res) => {
  try {
    console.log(req.body);

    const { name, address, companyname, mobile, email, gstno } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO vendor(name,address,companyname,mobile,email,gstno,vendor_img) VALUES(?,?,?,?,?,?,?)",
      [name, address, companyname, mobile, email, gstno, req.file.path]
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId, vendor_img: req.file.path },
      message: "vendor added successfully",
    });

    console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "vendor not-added successfully" + error.message,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    console.log(req.body);

    const { name, address, companyname, mobile, email, gstno } = req.body;

    const vendorId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM vendor WHERE id=${vendorId}`
    );

    console.log(
      name,
      address,
      companyname,
      mobile,
      email,
      gstno,
      vendorId,
      rows[0].vendor_img
    );

    let fileImg = "";
    if (req.file) {
      try {
        fs.unlinkSync(rows[0].vendor_img);
      } catch (err) {
        console.log(err);
      }
      fileImg = req.file.path;
    } else {
      fileImg = rows[0].vendor_img;
    }

    await pool.query(
      "UPDATE vendor SET name=?,address=?,companyname=?,mobile=?,email=?,gstno=?,vendor_img=? WHERE id=?",
      [name, address, companyname, mobile, email, gstno, fileImg, vendorId]
    );

    res.status(200).json({
      success: true,
      data: {
        name,
        address,
        companyname,
        mobile,
        email,
        gstno,
        vendor_img: fileImg,
        id: vendorId,
      },
      message: "vendor update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "vendor not-update successfully",
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM vendor WHERE id=${vendorId}`
    );

    try {
      fs.unlinkSync(rows[0].vendor_img);
    } catch (err) {
      console.log(err);
    }

    console.log(vendorId);

    await pool.query(`DELETE FROM vendor WHERE id=${vendorId}`);

    res.status(200).json({
      success: true,
      data: null,
      message: "vendor deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "vendor not-deleted successfully" + error.message,
    });
  }
};

module.exports = {
  getVendor,
  addVendor,
  updateVendor,
  deleteVendor,
};