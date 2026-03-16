
const express = require('express')
const { addInsfrastructure, getInsfrastructure, updateInsfrastructure, deleteInsfrastructure } = require('../controller/insfrastructure.controller')
const router = express.Router()


// GET
router.get('/getInsfrastructure', getInsfrastructure)

// POST
router.post('/addInsfrastructure', addInsfrastructure)

// PUT (Update)
router.put('/updateInsfrastructure/:id', updateInsfrastructure)

// DELETE
router.delete('/deleteInsfrastructure/:id', deleteInsfrastructure)


module.exports = router;