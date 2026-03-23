
const express = require('express')
const {  getTreatment, deleteTreatment, updateTreatment, addTreatment } = require('../controller/treatment.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getTreatment', getTreatment)

// POST
router.post('/addTreatment',upload.single('treatment_img'), addTreatment)

// PUT (Update)
 router.put('/updateTreatment/:id',upload.single('treatment_img'), updateTreatment)

// // DELETE
 router.delete('/deleteTreatment/:id', deleteTreatment)


module.exports = router;