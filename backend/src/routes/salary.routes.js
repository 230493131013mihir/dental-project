
const express = require('express')
const { addSalary, getSalary, updateSalary, deleteSalary } = require('../controller/salary.controller')
const router = express.Router()


// GET
router.get('/getSalary', getSalary)

// POST
router.post('/addSalary', addSalary)

// PUT (Update)
router.put('/updateSalary/:id', updateSalary)

// DELETE
router.delete('/deleteSalary/:id', deleteSalary)


module.exports = router;