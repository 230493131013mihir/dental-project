
const express = require('express')

const {getMedical, addMedical, updateMedical } = require('../controller/medical.controller');
// const { addMedical } = require('../../../frontend/src/redux/slice/medical.slice');
const router = express.Router()

//get

router.get("/getMedical", getMedical);

// POST
router.post('/addMedical', addMedical)

// PUT (Update)
router.put('/updateMedical/:id', updateMedical)




module.exports = router;