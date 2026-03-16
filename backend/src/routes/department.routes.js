
const express = require('express')
const { addDepartment, getDepartment, updateDepartment, deleteDepartment } = require('../controller/department.controller')
const router = express.Router()


// GET
router.get('/getDepartment', getDepartment)

// POST
router.post('/addDepartment', addDepartment)

// PUT (Update)
router.put('/updateDepartment/:id', updateDepartment)

// DELETE
router.delete('/deleteDepartment/:id', deleteDepartment)


module.exports = router;