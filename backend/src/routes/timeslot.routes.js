
const express = require('express')
const router = express.Router()


// GET
router.get('/getTimeslot', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addTimeslot', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Timeslot added successfully"
    })
})

// PUT (Update)
router.put('/updateTimeslot/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Timeslot updated successfully"
    })
})

// DELETE
router.delete('/deleteTimeslot/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Timeslot deleted successfully"
    })
})


module.exports = router;