import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authenthication.slice";
import {
  clearMyAppointment,
  getMyAppointment,
} from "../../redux/slice/appointment.slice";
import { getBranch } from "../../redux/slice/branch.slice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authenthication = useSelector((state) => state.authenthication);
  const myApt = useSelector((state) => state.appointment);
  const branches = useSelector((state) => state.branch.branch || []);

  useEffect(() => {
    dispatch(getBranch());

    if (authenthication.patient) {
      dispatch(getMyAppointment());
    }
  }, [authenthication.patient, dispatch]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearMyAppointment());
    closeMenu();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="header-contact-bar">
        <div className="container header-contact-inner">
          <span><i className="fa-solid fa-location-dot" /> {branches.length || 0} registered clinic{branches.length === 1 ? "" : "s"}</span>
          <div>
            <a href="tel:+919667353232">North India: +91 96673 53232</a>
            <a href="tel:+919393553232">South India: +91 93935 53232</a>
            <a href="tel:18003093232">Toll Free: 1800-309-3232</a>
          </div>
        </div>
      </div>

      <div className={`top-header ${isMenuOpen ? "mobile-open" : ""}`}>
        <div className="logo">
          <NavLink to="/" onClick={closeMenu}>
            <img src="images/logo5.png" alt="Main Logo" className="header-logo-img" />
          </NavLink>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav>
          <ul className="menu">
            <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
            <li className="has-mega">
              <a href="#serv" onClick={closeMenu}>Treatments</a>
              <div className="mega-menu">
                {["Root Canal Treatment", "Dental Implants", "Braces & Aligners", "Kids Dentistry", "Laser Dentistry", "Dental Crowns"].map((item) => (
                  <a href="#serv" key={item}>{item}</a>
                ))}
              </div>
            </li>
            <li><NavLink to="/branch" onClick={closeMenu}>Find Clinic</NavLink></li>
            <li><NavLink to="/department" onClick={closeMenu}>Doctors</NavLink></li>
            <li><a href="#tsti" onClick={closeMenu}>Patient Stories</a></li>
            <li><a href="#blog" onClick={closeMenu}>Blogs</a></li>
            <li><a href="#faq" onClick={closeMenu}>FAQs</a></li>
            {myApt.myAppointment.length > 0 && authenthication.patient ? (
              <li><NavLink to="/myappointment" onClick={closeMenu}>My Appointment</NavLink></li>
            ) : null}
            <li>
              {authenthication.patient ? (
                <button type="button" className="header-link-button" onClick={handleLogout}>Logout</button>
              ) : (
                <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
              )}
            </li>
          </ul>
        </nav>

        <div className="header-button">
          <NavLink to="/appointment" className="btn" onClick={closeMenu}>
            Book Appointment
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
