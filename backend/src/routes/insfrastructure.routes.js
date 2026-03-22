
const express = require('express')
const { addInsfrastructure, getInsfrastructure, updateInsfrastructure, deleteInsfrastructure } = require('../controller/insfrastructure.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getInsfrastructure', getInsfrastructure)

// POST
router.post('/addInsfrastructure', upload.single('insfrastructure_img'), addInsfrastructure)

// PUT (Update)
router.put('/updateInsfrastructure/:id', upload.single('insfrastructure_img'), updateInsfrastructure)

// DELETE
router.delete('/deleteInsfrastructure/:id', deleteInsfrastructure)


module.exports = router;