const pool = require("../db/mysql");

// GET BLOG
const addReview = async (req, res) => {
   try {
    console.log("okkk", req.body);
    
    const { rating, description, user_id } = req.body;

    console.log(rating, description, user_id);
    

    const [rows] = await pool.query(
      "INSERT INTO testimonial(rating, description, user_id) VALUES (?,?,?)",
      [rating, description, user_id]
    );

    res.status(200).json({
      success: true,
      data: {
        id: rows.insertId,
        rating,
        description,
        user_id,
      },
      message: "testimonial added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "testimonial not added " + error.message,
    });
  }
};

//get
const getReviews = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM testimonial");

    res.status(200).json({
      success: true,
      data: rows,
      message: "testimonial fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "testimonial not fetched",
    });
  }
};


// GET 
const getMyReview = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM testimonial");

    res.status(200).json({
      success: true,
      data: rows,
      message: "testimonial fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "testimonial not fetched",
    });
  }
};

module.exports = {
  addReview,
  getReviews,
  getMyReview,
  
};
