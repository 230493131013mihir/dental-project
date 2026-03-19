const pool = require("../db/mysql");

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
      message: "vendot not-fetched successfully",
    });
  }
};

const addVendor = async (req, res) => {
  try {
    console.log(req.body);

const { name, address, companyname, mobile, email, gstno } = req.body;

const [rows] = await pool.query(
  "INSERT INTO vendor(name, address, companyname, mobile, email, gstno) VALUES (?,?,?,?,?,?)",
  [name, address, companyname, mobile, email, gstno]
);

    res.status(200).json({
      success: true,
      data:  {...req.body, id: rows.insertId},
      message: "vendor added successfully",
    });
    console.log(rows);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "server not found"+ error.message,
    });
  }
};

const updateVendor = () => {
  try {
    console.log("updateVendor");
  } catch (error) {}
};

const deleteVendor = () => {
  try {
    console.log("deleteVendor");
  } catch (error) {}
};

module.exports = {
  getVendor,
  addVendor,
  updateVendor,
  deleteVendor,
};
