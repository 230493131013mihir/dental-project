const pool = require("../db/mysql");
const fs = require("fs");

const getMedicine = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM medicine");

    console.log("dfvdfv df", rows);
    

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
      message: "medicine not-fetched successfully" + error.message,
    });
  }
};

const addMedicine = async (req, res) => {
  try {

      console.log(req.body);
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

     console.log(req.file);
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

    console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medicine not-added successfully"+ error.message,
    });
  }
};

const updateMedicine = async (req, res) => {
  try {

     console.log(req.body);

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
      `SELECT * FROM medicine WHERE id=${medicineId}`,
    );

    console.log( branch_id,
      vendor_id,
      department_id,
      name,
      description,
      price,
      stock,
      expirydate,
      rows[0].medicine_img,
    )

    let fileImg = "";
              if (req.file) {
                fs.unlinkSync(rows[0].medicine_img, (error) => {
                  console.log(error);
                });
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

     console.log(fields,results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "medicine not-update successfully" + error.message,
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicineId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM medicine WHERE id=${medicineId}`
    );

      fs.unlinkSync(rows[0].medicine_img, (error) => {
                console.log(error);
              });
    
               console.log(medicineId);

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