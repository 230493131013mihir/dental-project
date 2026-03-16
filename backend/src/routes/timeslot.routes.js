
const express = require('express')
const { addTimeslot, getTimeslot, updateTimeslot, deleteTimeslot } = require('../controller/timeslot.controller')
const router = express.Router()


// GET
router.get('/getTimeslot', getTimeslot)

// POST
router.post('/addTimeslot', addTimeslot)

// PUT (Update)
router.put('/updateTimeslot/:id', updateTimeslot)

// DELETE
router.delete('/deleteTimeslot/:id', deleteTimeslot)


module.exports = router;