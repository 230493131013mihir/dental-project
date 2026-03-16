const pool = require("../db/mysql");

const getVendor = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vendor");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "rows added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "rows not-added successfully",
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
      data: req.body,
      message: "vendor added successfully",
    });
    console.log(rows);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "vendor not-added successfully",
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
