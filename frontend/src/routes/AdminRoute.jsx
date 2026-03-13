import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from '../admin/component/Layout/Layout'
import Branch from "../admin/container/Branch/Branch";
import Doctor from "../admin/container/Doctor/Doctor";
import Expence from "../admin/container/Expence/Expence";
import Insfrastructure from "../admin/container/Insfrastructure/Insfrastructure";
import Salary from "../admin/container/Salary/Salary";
import Services from "../admin/container/Services/Services";
import User from "../admin/container/User/User";
import Vendor from "../admin/container/Vendor/Vendor";

function AdminRoute(props) {
  return (
    <Layout>
      <Routes>
        <Route path="/branch" element={<Branch />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/expence" element={<Expence />} />
        <Route path="/insfrastructure" element={<Insfrastructure />} />
        <Route path="/medicine" element={<Salary />} />
        <Route path="/services" element={<Services />} />
        <Route path="/user" element={<User />} />
        <Route path="/vendor" element={<Vendor />} />
      </Routes>
    </Layout>
  );
}

export default AdminRoute;
