
const express = require('express')

const { RegisterDetails, login } = require('../controller/patient.controller');
const router = express.Router()



// POST
router.post('/RegisterDetails', RegisterDetails)
router.post('/login', login)

module.exports = router;