
const express = require('express')
const router = express.Router()


// GET
router.get('/getVendor', (req, res) => {
    res.send('hello world!')
})

// POST
router.post('/addVendor', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Vendor added successfully"
    })
})

// PUT (Update)
router.put('/updateVendor/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Vendor updated successfully"
    })
})

// DELETE
router.delete('/deleteVendor/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Vendor deleted successfully"
    })
})


module.exports = router;