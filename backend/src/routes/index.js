const express = require('express')
const router = express.Router()


const  branchRoutes=require ("./branch.routes");
const departmentRoutes=require ("./department.routes");

const expenceRoutes =require ("./expence.routes");
const insfrastructureRoutes=require ("./insfrastructure.routes");
const medicineRoutes=require ("./medicine.routes");
const salaryRoutes=require ("./salary.routes");
const servicesroutes=require ("./services.routes");
const timeslotRoutes=require ("./timeslot.routes");
const treatmentRoutes=require ("./treatment.routes");
const userRoutes=require ("./user.routes");
const vendorRoutes=require ("./vendor.routes");

const patientRoutes=require("./patient.routes")

const appointmentRoutes=require("./appointment.routes")

const blogRoutes= require("./blog.routes")




router.use("/branch" ,branchRoutes);
router.use("/department", departmentRoutes);

router.use("/expence", expenceRoutes);
router.use("/insfrastructure", insfrastructureRoutes);
router.use("/medicine", medicineRoutes);
router.use("/salary", salaryRoutes);
router.use("/services", servicesroutes);
router.use("/timeslot", timeslotRoutes);
router.use("/treatment", treatmentRoutes);
router.use("/user", userRoutes);
router.use("/vendor", vendorRoutes);

router.use("/patient", patientRoutes);

router.use("/appointment", appointmentRoutes);

router.use("/blog", blogRoutes);
    




module.exports = router;