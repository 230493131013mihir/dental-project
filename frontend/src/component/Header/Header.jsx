import React from 'react';
import { NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/slice/authenthication.slice';
import { useEffect } from 'react';
import { getMyAppointment } from '../../redux/slice/appointment.slice';


function Header(props) {

  const dispatch = useDispatch();
  const authenthication = useSelector(state => state.authenthication);

  console.log(authenthication);

  useEffect(() => {
    dispatch(getMyAppointment())
  }, []);

  const myApt = useSelector(state => state.appointment);

  console.log(myApt.myAppointment);
  

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
          <li>
            <NavLink to="/branch">Branch </NavLink>
          </li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li>
           <NavLink to="/department">Department </NavLink>
          </li>
          <li>
            <a href="#tst">Testonomial</a>
          </li>
          <li>
            <a href="javascript:void(0);">Blog</a>
          </li>
          <li><a href="#con">Contact <i className="fa-sharp fa-solid fa-down" /></a></li>
          <li><a href="javascript:void(0);">Pricing</a></li>
           {/* <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li> */}

          <li>
            {
              authenthication.patient ? <a onClick={() => dispatch(logout())}>Logout</a>:
            <NavLink to={"/login"}>Login</NavLink>
            }
          </li>
          
            {
              myApt.myAppointment.length > 0 ?
              <li><NavLink to={"/myappointment"}>My Appointment</NavLink></li> :
              null
            }
        </ul>
      </nav>
      <div className="header-button">
        <NavLink to={"/appointment"} className="btn">Get Appointment</NavLink>
      </div>
    </div>
  </div>
</header>

    );
}

export default Header;