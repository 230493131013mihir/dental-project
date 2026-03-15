
const express = require('express')
const router = express.Router()


// GET
router.get('/getServices', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addServices', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Services added successfully"
    })
})

// PUT (Update)
router.put('/updateServices/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Services updated successfully"
    })
})

// DELETE
router.delete('/deleteServices/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Services deleted successfully"
    })
})


module.exports = router;