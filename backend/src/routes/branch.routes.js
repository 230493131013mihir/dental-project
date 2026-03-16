
const express = require('express')
const { addBranch, getBranch, updateBranch, deleteBranch } = require('../controller/branch.controller')
const router = express.Router()


// GET
router.get('/getBranch', getBranch)

// POST
router.post('/addBranch', addBranch)

// PUT (Update)
router.put('/updateBranch/:id', updateBranch)

// DELETE
router.delete('/deleteBranch/:id', deleteBranch)


module.exports = router;