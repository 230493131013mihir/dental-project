const pool = require("../db/mysql");

const getTimeslot = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM timeslot");

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

const addTimeslot = async (req, res) => {
  try {
    console.log(req.body);

const { user_id, date, startdate, enddate } = req.body;

const [rows] = await pool.query(
  "INSERT INTO timeslot(user_id, date, startdate, enddate) VALUES (?,?,?,?)",
  [user_id, date, startdate, enddate]
);

    res.status(200).json({
      success: true,
      data: req.body,
      message: "timeslot added successfully",
    });
    console.log(rows, fields, result);
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: true,
      data: null,
      message: "timeslot not-added successfully",
    });
  }
};

const updateTimeslot = () => {
  try {
    console.log("updateTimeslot");
  } catch (error) {}
};

const deleteTimeslot = () => {
  try {
    console.log("deleteTimeslot");
  } catch (error) {}
};

module.exports = {
  getTimeslot,
  addTimeslot,
  updateTimeslot,
  deleteTimeslot,
};
