
const express = require('express')
const { addVendor, getVendor, updateVendor, deleteVendor } = require('../controller/vendor.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getVendor', getVendor)

// POST
router.post('/addVendor',upload.single('vendor_img'), addVendor)

// PUT (Update)
router.put('/updateVendor/:id',upload.single('vendor_img'), updateVendor)

// DELETE
router.delete('/deleteVendor/:id', deleteVendor)


module.exports = router;