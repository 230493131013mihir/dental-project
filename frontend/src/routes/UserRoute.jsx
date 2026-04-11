import React from "react";
import Header from "../component/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "../container/Home/Home";
import About from "../container/About/About";
import Footer from "../component/Footer/Footer";
import Branch from "../container/Branch/Branch";
import Department from "../container/Department/Department";
import BranchDetails from "../container/BranchDetails/BranchDetails";
import DepartmentDetails from "../container/DepartmentDetails/DepartmentDetails";
import RegisterDetails from "../container/RegisterDetails/RegisterDetails";
import Login from "../container/Login/Login";
import Appointment from "../container/Appointment/Appointment";
import MyAppointment from "../container/MyAppointment/MyAppointment";
import Review from "../container/Review/Review";
import MyAppointmentEdit from "../Admin/container/MyAppointmentEdit/MyAppointmentEdit";

function Userroute(props) {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/department" element={<Department />} />
        <Route path="/branch_details/:id" element={<BranchDetails />} />
        <Route path="/department_details/:id" element={<DepartmentDetails />} />
        <Route path="/register" element={<RegisterDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addReview" element={<Review />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/myappointment" element={<MyAppointment />} />
        <Route path="/myAppointmentEdit" element={<MyAppointmentEdit />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default Userroute;
