
const express = require('express')
const router = express.Router()


// GET
router.get('/getInsfrastructure', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addInsfrastructure', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "insfrastructure added successfully"
    })
})

// PUT (Update)
router.put('/updateInsfrastructure/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"insfrastructure updated successfully"
    })
})

// DELETE
router.delete('/deleteInsfrastructure/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "insfrastructure deleted successfully"
    })
})


module.exports = router;