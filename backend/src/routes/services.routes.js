
const express = require('express')
const { addServices, getServices, updateServices, deleteServices } = require('../controller/services.controller')
const router = express.Router()


// GET
router.get('/getServices', getServices)

// POST
router.post('/addServices', addServices)

// PUT (Update)
router.put('/updateServices/:id', updateServices)

// DELETE
router.delete('/deleteServices/:id', deleteServices)


module.exports = router;