require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

// GET
app.get('/addbranch', (req, res) => {
    res.send('hello world!')
})

// POST
app.post('/addBranch', (req, res) => {
    console.log(req.body)

    res.status(200).json({
        success: true,
        data: req.body,
        message: "Branch added successfully"
    })
})

// PUT (Update)
app.put('/addupdate/:id',(req,res)=>{
    console.log(req.params.id, req.body)

    res.status(200).json({
        success:true,
        id:req.params.id,
        data:req.body,
        message:"Branch updated successfully"
    })
})

// DELETE
app.delete('/deleteBranch/:id', (req, res) => {
    console.log("Delete ID:", req.params.id)

    res.status(200).json({
        success: true,
        id: req.params.id,
        message: "Branch deleted successfully"
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`)
})  