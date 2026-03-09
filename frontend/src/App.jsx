import React from "react";

import Home from "./container/Home/Home";

import { Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import About from "./container/About/About";
import Button from "./component/Button/Button";
import Btn2 from "./component/Btn2/Btn2";

function App(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Home /> */}
      </Routes>

      <Footer />
      
      <div>
        <h1>Hello</h1>
        <Button />
      </div>

      <Btn2/>

    </div>
    
  );
}

export default App;
