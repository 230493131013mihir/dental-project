import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./container/Home/Home";
import About from "./container/About/About";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Button from "./component/Button/Button";
import Btn2 from "./component/Btn2/Btn2";
import Counter from "./component/Counter/Counter"; // IMPORT COUNTER!
import Togglebtn from "./component/Togglebtn/Togglebtn";
import Disabled from "./component/Disabled/Disabled";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Hello</h1>
        <Button />
      </div>

      <Btn2 />
      <Disabled />

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>My React App</h1>
        <Counter />
      </div>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Toggle Button Example</h1>
        <Togglebtn />
      </div>

    </div>
  );
}

export default App;
