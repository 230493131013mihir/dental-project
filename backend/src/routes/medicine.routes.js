
const express = require('express')
const { addMedicine, getMedicine, updateMedicine, deleteMedicine } = require('../controller/medicine.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getMedicine', getMedicine)

// POST
router.post('/addMedicine', upload.single('medicine_img'), addMedicine)

// PUT (Update)
router.put('/updateMedicine/:id', upload.single('medicine_img'), updateMedicine)

// DELETE
router.delete('/deleteMedicine/:id', deleteMedicine)


module.exports = router;