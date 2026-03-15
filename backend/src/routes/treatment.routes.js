
const express = require('express')
const router = express.Router()


// GET
router.get('/getTreatment', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addTreatment', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Treatment added successfully"
    })
})

// PUT (Update)
router.put('/updateTreatment/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Treatment updated successfully"
    })
})

// DELETE
router.delete('/deleteTreatment/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Treatment deleted successfully"
    })
})


module.exports = router;