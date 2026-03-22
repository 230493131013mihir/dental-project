const pool = require("../db/mysql");
const fs = require("fs");

const getServices = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "services fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "server not found" + error.message,
    });
  }
};

const addServices = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id, department_id, user_id, name, description } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO services(branch_id,department_id,user_id,name,description,services_img) VALUES(?,?,?,?,?,?)",
      [branch_id, department_id, user_id, name, description, req.file.path]
    );

    res.status(200).json({
      success: true,
      data: {
        ...req.body,
        id: rows.insertId,
        services_img: req.file.path,
      },
      message: "services added successfully",
    });

    console.log(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "services not-added successfully" + error.message,
    });
  }
};

const updateServices = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id, department_id, user_id, name, description } = req.body;

    const servicesId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM services WHERE id=${servicesId}`
    );

    console.log(
      branch_id,
      department_id,
      user_id,
      name,
      description,
      servicesId,
      rows[0].services_img
    );

    let fileImg = "";
    if (req.file) {
      try {
        fs.unlinkSync(rows[0].services_img);
      } catch (err) {
        console.log(err);
      }
      fileImg = req.file.path;
    } else {
      fileImg = rows[0].services_img;
    }

    await pool.query(
      "UPDATE services SET branch_id=?,department_id=?,user_id=?,name=?,description=?,services_img=? WHERE id=?",
      [
        branch_id,
        department_id,
        user_id,
        name,
        description,
        fileImg,
        servicesId,
      ]
    );

    res.status(200).json({
      success: true,
      data: {
        branch_id,
        department_id,
        user_id,
        name,
        description,
        services_img: fileImg,
        id: servicesId,
      },
      message: "services update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "services not-update successfully",
    });
  }
};

const deleteServices = async (req, res) => {
  try {
    const servicesId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM services WHERE id=${servicesId}`
    );

    try {
      fs.unlinkSync(rows[0].services_img);
    } catch (err) {
      console.log(err);
    }

    console.log(servicesId);

    await pool.query(`DELETE FROM services WHERE id=${servicesId}`);

    res.status(200).json({
      success: true,
      data: null,
      message: "services deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "services not-deleted successfully" + error.message,
    });
  }
};

module.exports = {
  getServices,
  addServices,
  updateServices,
  deleteServices,
};