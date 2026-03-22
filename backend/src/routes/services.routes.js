
const express = require('express')
const { addServices, getServices, updateServices, deleteServices } = require('../controller/services.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getServices', getServices)

// POST
router.post('/addServices' ,upload.single('services_img'), addServices)

// PUT (Update)
router.put('/updateServices/:id',upload.single('services_img'), updateServices)

// DELETE
router.delete('/deleteServices/:id', deleteServices)


module.exports = router;