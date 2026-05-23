require("dotenv").config();
const express = require("express");
const routes = require("./routes/index.js");
const cors = require('cors')



const app = express();
app.use(express.json());
app.use(cors())


app.use('/public', express.static('public'))





app.use("/",routes);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{

    
    console.log(`Server started at port ${port}`);
})

