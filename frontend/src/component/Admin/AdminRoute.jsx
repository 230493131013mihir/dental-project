import React from "react";
import Layout from "../../Admin/Component/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Branch from "../../Admin/Component/Container/Branch/Branch";
import Doctor from "../../Admin/Component/Container/Doctor/Doctor";

function AdminRoute(props) {
  return (
    <Layout>
      <Routes>
        <Route path="/Branch" element={<Branch />} />
        <Route path="/Doctor" element={<Doctor />} />
      </Routes>
    </Layout>
  );
}

export default AdminRoute;
