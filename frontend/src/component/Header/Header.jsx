import React from 'react';

function Header(props) {
    return (
       <header>
  <div className="container">
    <div className="top-header">
      <div className="logo">
        <a href="index.html"><img src="images/logo-main.png" alt="Main Logo" /></a>
      </div>
      <nav>
        <ul className="menu">
          <li>
            <a href="#hro">Home </a>
          </li>
          <li><a href="#abt">About Us</a></li>
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