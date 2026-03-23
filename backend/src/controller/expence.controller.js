const pool = require("../db/mysql");
const fs = require("fs");

const getExpence = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM expence");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "expence fetched successfully",
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

const addExpence = async (req, res) => {
  try {
    console.log(req.body);

    const { branch_id, payment_id, paymenttype_id, type, amount, date } =
      req.body;

    console.log(req.file);

    const [rows, fields, result] = await pool.query(
      "INSERT INTO expence(branch_id,payment_id,paymenttype_id,type,amount,date,expence_img) VALUES(?,?,?,?,?,?,?)",
      [branch_id, payment_id, paymenttype_id, type, amount, date, req.file.path],
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId, expence_img: req.file.path },
      message: "expence added successfully",
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

const updateExpence = async (req, res) => {
  try {
    console.log("req.body");

    const { branch_id, payment_id, paymenttype_id, type, amount, date } = req.body;

    const expenceId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM expence WHERE id=${expenceId}`,
    );

    console.log(branch_id, payment_id, paymenttype_id, type, amount, date,expenceId, rows[0].expence_img,);
    let fileImg = "";
    if (req.file) {
      fs.unlinkSync(rows[0].expence_img, (error) => {
        console.log(error);
      });
      fileImg = req.file.path;
    } else {
      fileImg = rows[0].expence_img;
    }

    await pool.query(
      "UPDATE expence SET branch_id = ?,payment_id= ?,paymenttype_id= ?,type= ?,amount= ?,date= ?,expence_img=? WHERE id=?",
      [branch_id, payment_id, paymenttype_id, type, amount, date, fileImg, expenceId,],
    );

    res.status(200).json({
      success: true,
      data: { branch_id, payment_id, paymenttype_id, type, amount, date,expence_img: fileImg, id: expenceId, },
      message: "expence update successfully",
    });

          console.log(fields,results);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "expence not-update successfully",
    });
  }
};

const deleteExpence = async (req, res) => {
  try {
    //console.log(req.body);
    const expenceId = req.params.id;
    // console.log(expenceId);

    const [rows] = await pool.query(
      `SELECT * FROM expence WHERE id=${expenceId}`,
    );

        fs.unlinkSync(rows[0].expence_img, (error) => {
          console.log(error);
        });

        console.log(expenceId);

    await pool.query(
      `DELETE FROM expence WHERE id=${expenceId}`,
      [expenceId],
    );

    res.status(200).json({
      success: true,
      data: null,
      message: "expence deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "expence not-deleted successfully",
    });
  }
};

module.exports = {
  getExpence,
  addExpence,
  updateExpence,
  deleteExpence,
};
