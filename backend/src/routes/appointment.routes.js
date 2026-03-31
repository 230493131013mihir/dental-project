
const express = require('express')

const { bookAppointment, getAppointment, addTreatment } = require('../controller/appointment.controller');
const router = express.Router()

//get

router.get('/getAppointment', getAppointment)

// POST
router.post('/bookAppointment', bookAppointment)

//post
router.post('/addTreatment', addTreatment)


module.exports = router;