
const express = require('express')
const { addVendor, getVendor, updateVendor, deleteVendor } = require('../controller/vendor.controller')
const router = express.Router()


// GET
router.get('/getVendor', getVendor)

// POST
router.post('/addVendor', addVendor)

// PUT (Update)
router.put('/updateVendor/:id', updateVendor)

// DELETE
router.delete('/deleteVendor/:id', deleteVendor)


module.exports = router;