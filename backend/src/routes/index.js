const express = require('express')
const router = express.Router()


const  branchRoutes=require ("./branch.routes");
const departmentRoutes=require ("./department.routes");


router.use("/branch" ,branchRoutes);
router.use("/department", departmentRoutes);




module.exports = router;