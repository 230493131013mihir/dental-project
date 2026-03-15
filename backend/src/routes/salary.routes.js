
const express = require('express')
const router = express.Router()


// GET
router.get('/getSalary', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addSalary', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Salary added successfully"
    })
})

// PUT (Update)
router.put('/updateSalary/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Salary updated successfully"
    })
})

// DELETE
router.delete('/deleteSalary/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Salary deleted successfully"
    })
})


module.exports = router;