
const express = require('express')
const { addExpence, getExpence, updateExpence, deleteExpence } = require('../controller/expence.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getExpence', getExpence)

// POST
router.post('/addExpence', upload.single('branch_img'), addExpence)

// PUT (Update)
router.put('/updateExpence/:id', upload.single('branch_img'), updateExpence)

// DELETE
router.delete('/deleteExpence/:id', deleteExpence)


module.exports = router;