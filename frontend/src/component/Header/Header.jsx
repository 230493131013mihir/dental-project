import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authenthication.slice";
import { useEffect } from "react";
import {
  clearMyAppointment,
  getMyAppointment,
} from "../../redux/slice/appointment.slice";

function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenthication = useSelector((state) => state.authenthication);

  console.log(authenthication);

  useEffect(() => {
    if (authenthication.patient) {
      dispatch(getMyAppointment());
    }
  }, [authenthication.patient, dispatch]);

  const myApt = useSelector((state) => state.appointment);

  console.log(myApt.myAppointment);

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearMyAppointment());
    navigate("/");
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {/* <div className="container"> */}
      <div style={{ width: "100%" }}>
        {/* <div className="top-header"></div> */}
        <div
  className="top-header"
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  }}
>
          <div className="logo">
            <NavLink to="/">
              <img
                src="images/logo5.png"
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
              <li>
                <a
                  href="#con"
                  onClick={() =>
                    alert(
                      "Contact us at +91 98765 43210 or visit our dental clinic during working hours."
                    )
                  }
                >
                  Contact <i className="fa-sharp fa-solid fa-down" />
                </a>
              </li>
              {/* <li><a href="javascript:void(0);">Pricing</a></li> */}
              {/* <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li> */}

              <li>
                {authenthication.patient ? (
                  <a onClick={handleLogout}>Logout</a>
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
