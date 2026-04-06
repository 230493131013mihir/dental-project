const pool = require("../db/mysql");

const getTimeslot = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM timeslot");

    console.log(rows);
    res.status(200).json({
      success: true,
      data: rows,
      message: "timeslot fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "timeslot not-fetched successfully",
    });
  }
};

const addTimeslot = async (req, res) => {
  try {
    console.log("hhujhjh",req.body);

    const { user_id, date, starttime, endtime,handlepatient } = req.body;

    console.log(req.file);

    const [rows] = await pool.query(
      "INSERT INTO timeslot(user_id,date,starttime,endtime,handlepatient) VALUES(?,?,?,?,?)",
      [user_id, date, starttime, endtime,handlepatient]
    );

    res.status(200).json({
      success: true,
      data: { ...req.body, id: rows.insertId, },
      message: "timeslot added successfully",
    });

    console.log(rows, fields, result);
    console.log(req.body);  
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "timeslot not-added successfully" + error.message,
    });
  }
};

const updateTimeslot = async (req, res) => {
  try {
    console.log(req.body);

    const { user_id, date, starttime, endtime, handlepatient } = req.body;

    const timeslotId = req.params.id;

    const [rows] = await pool.query(
      `SELECT * FROM timeslot WHERE id=${timeslotId}`
    );

    console.log(user_id, date, starttime, endtime,handlepatient, timeslotId);

    await pool.query(
      "UPDATE timeslot SET user_id=?,date=?,starttime=?,endtime=?,handlepatient=? WHERE id=?",
      [user_id, date, starttime, endtime,handlepatient, timeslotId]
    );

    res.status(200).json({
      success: true,
      data: {
        user_id,
        date,
        starttime,
        endtime,
        handlepatient,
        id: timeslotId,
      },
      message: "timeslot update successfully",
    });

    console.log(fields,results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "timeslot not-update successfully",
    });
  }
};

const deleteTimeslot = async (req, res) => {
  try {
    const timeslotId = req.params.id;

  const [rows] = await pool.query(
      `SELECT * FROM timeslot WHERE id=${timeslotId}`
    );


    console.log(timeslotId);

    
    await pool.query(
      `DELETE FROM timeslot WHERE id=${timeslotId}`,
      [timeslotId]
    );
  

    res.status(200).json({
      success: true,
      data: null,
      message: "timeslot deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "timeslot not-deleted successfully" + error.message,
    });
  }
};

module.exports = {
  getTimeslot,
  addTimeslot,
  updateTimeslot,
  deleteTimeslot,
};