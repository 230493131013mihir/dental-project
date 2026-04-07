
const express = require('express')

const {getMedical } = require('../controller/medical.controller');
const router = express.Router()

//get

router.get("/getMedical", getMedical);




module.exports = router;