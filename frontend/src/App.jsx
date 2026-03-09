import React from "react";

import Home from "./container/Home/Home";

import { Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import About from "./container/About/About";

function App(props) {
  return (
    <div>
      <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
         {/* <Home /> */}
      </Routes>
       
      
  
      <Footer />
    </div>
  );
}

export default App;
