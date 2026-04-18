import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authenthication.slice";
import { useEffect } from "react";
import { getMyAppointment } from "../../redux/slice/appointment.slice";

function Header(props) {
  const dispatch = useDispatch();
  const authenthication = useSelector((state) => state.authenthication);

  console.log(authenthication);

  useEffect(() => {
    dispatch(getMyAppointment());
  }, []);

  const myApt = useSelector((state) => state.appointment);

  console.log(myApt.myAppointment);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <div className="container">
        <div className="top-header">
          <div className="logo">
            <NavLink to="/">
              <img
                src="images/logo4.svg"
                alt="Main Logo"
                style={{ width: "250px", height: "100px" }}
              />
            </NavLink>
          </div>
          <nav>
            <ul className="menu">
              <li>
                <NavLink to="/">Home </NavLink>
              </li>
              <li>
                <NavLink to="/branch">Branch </NavLink>
              </li>
              <li>
                <NavLink to="/department">Department </NavLink>
              </li>
              <li>
                <a href="#tsti">Testonomial</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#faq">Faq</a>
              </li>
             <li style={{ listStyle: "none" }}>
  <a
    href="tel:+919876543210"
    style={{
      textDecoration: "none",
      color: "#333",
      fontWeight: "500"
    }}
  >
    Contact 
    {/* <i className="fa-solid fa-phone"></i> */}
  </a>
</li>
              {/* <li><a href="javascript:void(0);">Pricing</a></li> */}
              {/* <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li> */}

              <li>
                {authenthication.patient ? (
                  <a onClick={() => dispatch(logout())}>Logout</a>
                ) : (
                  <NavLink to={"/login"}>Login</NavLink>
                )}
              </li>

              {myApt.myAppointment.length > 0 && authenthication.patient ? (
                <li>
                  <NavLink to={"/myappointment"}>My Appointment</NavLink>
                </li>
              ) : null}
            </ul>
          </nav>
          <div className="header-button">
            <NavLink to={"/appointment"} className="btn">
              Book Appointment
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
