
const express = require('express')

const { RegisterDetails, login, getPatient, deletePatient, updatePatient, addPatient } = require('../controller/patient.controller');
const router = express.Router()



// POST
router.post('/RegisterDetails', RegisterDetails)
router.post('/login', login)
router.get("/getPatient", getPatient);
router.post("/addPatient", addPatient);

router.put("/updatePatient/:id", updatePatient);
router.delete("/deletePatient/:id", deletePatient);

module.exports = router;