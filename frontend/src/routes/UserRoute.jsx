import React from "react";
import Header from "../component/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "../container/Home/Home";
import About from "../container/About/About";
import Footer from "../component/Footer/Footer";

function Userroute(props) {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
      </Routes>

      <Footer />
    </div>
  );
}

export default Userroute;
