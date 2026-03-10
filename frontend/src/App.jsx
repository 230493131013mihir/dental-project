import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import Home from "./container/Home/Home";
import About from "./container/About/About";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Button from "./component/Button/Button";
import Btn2 from "./component/Btn2/Btn2";
import Counter from "./component/Counter/Counter"; // IMPORT COUNTER!
import Togglebtn from "./component/Togglebtn/Togglebtn";
import Disabled from "./component/Disabled/Disabled";
import Button3 from "./component/Button3/Button3";
import Userroute from "./component/Admin/Userroute";
import AdminRoute from "./component/Admin/AdminRoute";

function App() {
  return (
    
      <Routes>
        <Route path="/*" element={<Userroute />} />
        <Route path="/Admin/*" element={<AdminRoute />} />
      </Routes>

      
    
  );
}


export default App;
