
const express = require('express')
const { addTreatment, getTreatment, updateTreatment, deleteTreatment } = require('../controller/treatment.controller')
const router = express.Router()


// GET
router.get('/getTreatment', getTreatment)

// POST
router.post('/addTreatment', addTreatment)

// PUT (Update)
router.put('/updateTreatment/:id', updateTreatment)

// DELETE
router.delete('/deleteTreatment/:id', deleteTreatment)


module.exports = router;