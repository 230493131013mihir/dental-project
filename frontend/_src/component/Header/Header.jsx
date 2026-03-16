import React from 'react';
import { NavLink, Route, Routes } from "react-router-dom";


function Header(props) {
    return (
       <header>
  <div className="container">
    <div className="top-header">
      <div className="logo">
        <NavLink to="/"><img src="images/logo-main.png" alt="Main Logo" /></NavLink>
      </div>
      <nav>
        <ul className="menu">
          <li>
            <NavLink to="/">Home </NavLink>
          </li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li>
            <a href="#serv">Services</a>
          </li>
          <li>
            <a href="#tst">Testonomial</a>
          </li>
          <li>
            <a href="javascript:void(0);">Blog</a>
          </li>
          <li><a href="#con">Contact <i className="fa-sharp fa-solid fa-down" /></a></li>
          <li><a href="javascript:void(0);">Pricing</a></li>
        </ul>
      </nav>
      <div className="header-button">
        <a href="javascript:void(0);" className="btn">Get Appointment</a>
      </div>
    </div>
  </div>
</header>

    );
}

export default Header;