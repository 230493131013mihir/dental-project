const pool = require("../db/mysql");
const fs = require("fs");

const getInsfrastructure = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM insfrastructure");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "insfrastructure fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "server not-fetched successfully" + error.message,
    });
  }
};

const addInsfrastructure = async (req, res) => {
  try {

     console.log(req.body);
    const {
      branch_id,
      department_id,
      type_id,
      vendor_id,
      description,
      name,
      price,
    } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO insfrastructure(branch_id,department_id,type_id,vendor_id,description,name,price,insfrastructure_img) VALUES(?,?,?,?,?,?,?,?)",
      [
        branch_id,
        department_id,
        type_id,
        vendor_id,
        description,
        name,
        price,
        req.file.path,
      ]
    );

    res.status(200).json({
      success: true,
      data: {
        ...req.body,
        id: rows.insertId,
        insfrastructure_img: req.file.path,
      },
      message: "insfrastructure added successfully",
    });

   console.log(rows, fields, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "server not found" + error.message,
    });
  }
};

const updateInsfrastructure = async (req, res) => {
  try {
      console.log(req.body);
    const {
      branch_id,
      department_id,
      type_id,
      vendor_id,
      description,
      name,
      price,
    } = req.body;

    const insfrastructureId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM insfrastructure WHERE id=${insfrastructureId}`,
    );
    console.log(branch_id,
      department_id,
      type_id,
      vendor_id,
      description,
      name,
      price,
      rows[0].insfrastructure_img,
    )

  let fileImg = "";
          if (req.file) {
            fs.unlinkSync(rows[0].insfrastructure_img, (error) => {
              console.log(error);
            });
            fileImg = req.file.path;
          } else {
            fileImg = rows[0].insfrastructure_img;
          }

    await pool.query(
      "UPDATE insfrastructure SET branch_id=?,department_id=?,type_id=?,vendor_id=?,description=?,name=?,price=?,insfrastructure_img=? WHERE id=?",
      [
        branch_id,
        department_id,
        type_id,
        vendor_id,
        description,
        name,
        price,
        fileImg,
        insfrastructureId,
      ]
    );

    res.status(200).json({
      success: true,
      data: {
        branch_id,
        department_id,
        type_id,
        vendor_id,
        description,
        name,
        price,
        insfrastructure_img: fileImg,
        id: insfrastructureId,
      },
      message: "insfrastructure update successfully",
    });
      console.log(fields,results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "insfrastructure not-update successfully",
    });
  }
};

const deleteInsfrastructure = async (req, res) => {
  try {
    const insfrastructureId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM insfrastructure WHERE id=${insfrastructureId}`
    );

    
       fs.unlinkSync(rows[0].insfrastructure_img, (error) => {
            console.log(error);
          });

           console.log(insfrastructureId);

    await pool.query(
      `DELETE FROM insfrastructure WHERE id=${insfrastructureId}`
    );

    res.status(200).json({
      success: true,
      data: null,
      message: "insfrastructure deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "insfrastructure not-deleted successfully"+ error.message,
    });
  }
};

module.exports = {
  getInsfrastructure,
  addInsfrastructure,
  updateInsfrastructure,
  deleteInsfrastructure,
};