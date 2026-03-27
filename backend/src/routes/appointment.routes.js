
const express = require('express')

const { bookAppointment, getAppointment } = require('../controller/appointment.controller');
const router = express.Router()

//get

router.get('/getAppointment', getAppointment)

// POST
router.post('/bookAppointment', bookAppointment)


module.exports = router;