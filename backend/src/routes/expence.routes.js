
const express = require('express')
const { addExpence, getExpence, updateExpence, deleteExpence } = require('../controller/expence.controller')
const router = express.Router()


// GET
router.get('/getExpence', getExpence)

// POST
router.post('/addExpence', addExpence)

// PUT (Update)
router.put('/updateExpence/:id', updateExpence)

// DELETE
router.delete('/deleteExpence/:id', deleteExpence)


module.exports = router;