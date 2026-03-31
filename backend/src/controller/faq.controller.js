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
    res.status(500).json({
      success: false,
      message: "faq not fetched",
    });
  }
};

// ADD FAQ
const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO faq(question, answer) VALUES (?,?)",
      [question, answer]
    );

    res.status(200).json({
      success: true,
      data: { id: rows.insertId, question, answer },
      message: "faq added successfully",
    });
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
      data: { id: faqId, question, answer },
      message: "faq updated successfully",
    });
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