
const express = require('express')
const router = express.Router()


// GET
router.get('/getDepartment', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addDepartment', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "department added successfully"
    })
})

// PUT (Update)
router.put('/updateDepartment/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"department updated successfully"
    })
})

// DELETE
router.delete('/deleteDepartment/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "department deleted successfully"
    })
})


module.exports = router;