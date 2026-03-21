
const express = require('express')
const { addExpence, getExpence, updateExpence, deleteExpence } = require('../controller/expence.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getExpence', getExpence)

// POST
router.post('/addExpence', upload.single('expence_img'), addExpence)

// PUT (Update)
router.put('/updateExpence/:id', upload.single('expence_img'), updateExpence)

// DELETE
router.delete('/deleteExpence/:id', deleteExpence)


module.exports = router;