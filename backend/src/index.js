require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index.js");

app.use(express.json());




app.use("/",routes);

app.listen(process.env.PORT, ()=>{

    
    console.log(`Server started at port ${process.env.PORT}`);
})

