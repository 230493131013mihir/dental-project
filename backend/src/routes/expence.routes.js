
const express = require('express')
const router = express.Router()


// GET
router.get('/getExpence', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addExpence', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Expence added successfully"
    })
})

// PUT (Update)
router.put('/updateExpence/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Expence updated successfully"
    })
})

// DELETE
router.delete('/deleteExpence/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Expence deleted successfully"
    })
})


module.exports = router;