
const express = require('express')

const { bookAppointment, getAppointment, addTreatment, getMyAppointment } = require('../controller/appointment.controller');
const router = express.Router()

//get

router.get('/getAppointment', getAppointment)

router.get('/getMyAppointment/:user_id', getMyAppointment)

// POST
router.post('/bookAppointment', bookAppointment)

//post
router.post('/addTreatment', addTreatment)


module.exports = router;