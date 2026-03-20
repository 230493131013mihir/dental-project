
const express = require('express')
const { addDepartment, getDepartment, updateDepartment, deleteDepartment } = require('../controller/department.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getDepartment', getDepartment)

// POST
router.post('/addDepartment',upload.single('department_img'), addDepartment)

// PUT (Update)
router.put('/updateDepartment/:id',upload.single('department_img'), updateDepartment)

// DELETE
router.delete('/deleteDepartment/:id', deleteDepartment)


module.exports = router;