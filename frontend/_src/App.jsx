import React from "react";
import { Route, Routes } from "react-router-dom";
import Userroute from "./routes/Userroute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    
      <Routes>
        <Route path="/*" element={<Userroute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>

      
    
  );
}


export default App;
