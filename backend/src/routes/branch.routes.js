
const express = require('express')
const router = express.Router()


// GET
router.get('/getBranch', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addBranch', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Branch added successfully"
    })
})

// PUT (Update)
router.put('/updateBranch/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Branch updated successfully"
    })
})

// DELETE
router.delete('/deleteBranch/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Branch deleted successfully"
    })
})


module.exports = router;