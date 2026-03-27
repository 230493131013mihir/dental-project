import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from '../Admin/Component/Layout/Layout'
import Branch from "../Admin/container/Branch/Branch";
import Expence from "../Admin/container/Expence/Expence";
import Insfrastructure from "../Admin/container/Insfrastructure/Insfrastructure";
import Salary from "../Admin/container/Salary/Salary";
import Services from "../Admin/container/Services/Services";
import User from "../Admin/container/User/User";
import Vendor from "../Admin/container/Vendor/Vendor";
import Department from "../Admin/container/Department/Department";
import Medicine from "../Admin/container/Medicine/Medicine";
import Timeslot from "../Admin/container/Timeslot/Timeslot";
import Treatment from "../Admin/container/Treatment/Treatment";
import Appointment from "../Admin/container/Appointment/Appointment";

function AdminRoute(props) {
  return (
    <Layout>
      <Routes>
        <Route path="/branch" element={<Branch />} />
        <Route path="/department" element={<Department />} />
        <Route path="/expence" element={<Expence />} />
        <Route path="/insfrastructure" element={<Insfrastructure />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/services" element={<Services />} />
        <Route path="/user" element={<User />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/medicine" element={<Medicine />} />

        <Route path="/treatment" element={<Treatment />} />
        <Route path="/timeslot" element={<Timeslot />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </Layout>
  );
}

export default AdminRoute;
