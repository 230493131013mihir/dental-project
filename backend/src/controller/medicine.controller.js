const pool = require("../db/mysql");

const getMedicine = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM medicine");

    console.log(rows);
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
    console.log(req.body);

    const { vendor_id, department_id, name, description, price, stock, expirydate } = req.body;

    console.log(req.file);

const [rows] = await pool.query(
  "INSERT INTO medicine(vendor_id, department_id, name, description, price, stock, expirydate,medicine_img) VALUES (?,?,?,?,?,?,?)",
  [vendor_id, department_id, name, description, price, stock, expirydate, req.file.path]
);

    res.status(200).json({
      success: true,
      data:  {...req.body, id: rows.insertId,medicine_img: req.file.path},
      message: "medicine added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "server not found"+ error.message,
    });
  }
};

const updateMedicine = () => {
  try {
    console.log("updateMedicine");
  } catch (error) {}
};

const deleteMedicine = () => {
  try {
    console.log("deleteMedicine");
  } catch (error) {}
};

module.exports = {
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
};
