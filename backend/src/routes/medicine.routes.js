
const express = require('express')
const { addMedicine, getMedicine, updateMedicine, deleteMedicine } = require('../controller/medicine.controller')
const router = express.Router()


// GET
router.get('/getMedicine', getMedicine)

// POST
router.post('/addMedicine', addMedicine)

// PUT (Update)
router.put('/updateMedicine/:id', updateMedicine)

// DELETE
router.delete('/deleteMedicine/:id', deleteMedicine)


module.exports = router;