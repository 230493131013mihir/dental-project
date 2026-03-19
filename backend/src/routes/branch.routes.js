
const express = require('express')
const { addBranch, getBranch, updateBranch, deleteBranch } = require('../controller/branch.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getBranch', getBranch)

// POST
router.post('/addBranch', upload.single('branch_img'), addBranch)

// PUT (Update)
router.put('/updateBranch/:id', updateBranch)

// DELETE
router.delete('/deleteBranch/:id', deleteBranch)


module.exports = router;