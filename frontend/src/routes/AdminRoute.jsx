import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from '../admin/component/Layout/Layout'
import Branch from "../admin/container/Branch/Branch";
import Expence from "../admin/container/Expence/Expence";
import Insfrastructure from "../admin/container/Insfrastructure/Insfrastructure";
import Salary from "../admin/container/Salary/Salary";
import Services from "../admin/container/Services/Services";
import User from "../admin/container/User/User";
import Vendor from "../admin/container/Vendor/Vendor";
import Department from "../admin/container/Department/Department";
import Medicine from "../admin/container/Medicine/Medicine";

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
      </Routes>
    </Layout>
  );
}

export default AdminRoute;
