const pool = require("../db/mysql");

// GET FAQ
const getFAQ = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM faq");

    res.status(200).json({
      success: true,
      data: rows,
      message: "faq fetched successfully",
    });
  } catch (error) {
      console.log(error);
    res.status(500).json({
      success: false,
      message: "faq not fetched",
    });
  }
};

// ADD FAQ
const addFAQ = async (req, res) => {
  try {

     console.log(req.body);
    const { question, answer } = req.body;

      console.log(question,answer,req.file);

    const [rows] = await pool.query(
      "INSERT INTO faq(question, answer) VALUES (?,?)",
      [question, answer]
    );

    res.status(200).json({
      success: true,
      data: { id: rows.insertId, question, answer },
      message: "faq added successfully",
    });

     console.log(rows, fields, result);
     
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "faq not added",
    });
  }
};

// UPDATE FAQ
const updateFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faqId = req.params.id;

    await pool.query(
      "UPDATE faq SET question=?, answer=? WHERE id=?",
      [question, answer, faqId]
    );

    res.status(200).json({
      success: true,
      data: {  question, answer,id: faqId },
      message: "faq updated successfully",
    });
      console.log(fields,results);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "faq not updated",
    });
  }
};

// DELETE FAQ
const deleteFAQ = async (req, res) => {
  try {
    const faqId = req.params.id;

      const [rows] = await pool.query(
      `SELECT * FROM faq WHERE id=${faqId}`
    );

    await pool.query(`DELETE FROM faq WHERE id=${faqId}`);

    res.status(200).json({
      success: true,
      message: "faq deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "faq not deleted",
    });
  }
};

module.exports = {
  getFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
};