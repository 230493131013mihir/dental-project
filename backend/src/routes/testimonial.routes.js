
const express = require('express')

const upload = require('../middleware/upload')
const { getReviews, addReview, getMyReview } = require('../controller/testimonial.controller')
const router = express.Router()


// GET
router.get('/getReviews', getReviews)

// POST
router.post('/addReview', addReview)

// PUT (Update)
router.put('/getMyReview', getMyReview)


module.exports = router;