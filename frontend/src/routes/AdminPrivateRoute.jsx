import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPrivateRoute({ children }) {
  const authenthication = useSelector((state) => state.authenthication);
  const user = authenthication.patient;
  const allowedRoles = ["Admin", "Doctor", "Nurse", "Receptionist"];

  if (!user || !allowedRoles.includes(user.role_id)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminPrivateRoute;
