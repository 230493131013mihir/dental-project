import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const savedSubscribers = JSON.parse(
      localStorage.getItem("dental_subscribers") || "[]",
    );

    if (savedSubscribers.includes(normalizedEmail)) {
      setMessage("This email is already subscribed.");
      return;
    }

    localStorage.setItem(
      "dental_subscribers",
      JSON.stringify([...savedSubscribers, normalizedEmail]),
    );
    setMessage("Subscribed successfully. We will send dental offers and updates.");
    setEmail("");
  };

  return (
    <footer>
      <div className="container">
        <div className="row footer-top">
          <div className="col-lg-6">
            <div className="bottom-footer">
              <div className="heading">
                <h2>Achieve your dream smile with expert dental care</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="bottom-footer">
              <div className="heading">
                <p className="footer-para">
                  Book a consultation, find your nearest clinic, or ask for a quick callback from our team.
                </p>
                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="footer-email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <button type="submit" className="btn footer-btn">Submit Now</button>
                </form>
                {message ? <div className="footer-subscribe-message">{message}</div> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="row footer-bottom">
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget">
              <div className="widget-content">
                <img src="images/logo-white.png" alt="Dental clinic logo" />
                <p>
                  Complete dental care with branches, specialists, appointments, reviews, treatment plans and patient support.
                </p>
                <div className="widget-icon">
                  <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
                  <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a>
                  <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
                  <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 quick">
            <h3>Quick Links</h3>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/branch">Find a Clinic</NavLink></li>
              <li><NavLink to="/department">Doctors</NavLink></li>
              <li><NavLink to="/appointment">Appointment</NavLink></li>
            </ul>
          </div>

          <div className="col-sm-6 col-lg-3 quick">
            <h3>Treatments</h3>
            <ul>
              <li><a href="#serv">Root Canal Treatment</a></li>
              <li><a href="#serv">Dental Implants</a></li>
              <li><a href="#serv">Braces & Aligners</a></li>
              <li><a href="#serv">Kids Dentistry</a></li>
            </ul>
          </div>

          <div className="col-sm-6 col-lg-3 address">
            <h3>Contact</h3>
            <div className="icon1">
              <a href="tel:+919667353232" aria-label="Call North India"><i className="fa-solid fa-phone" /></a>
              <div className="add-content">
                <p>North India<br />+91 96673 53232</p>
              </div>
            </div>
            <div className="icon1">
              <a href="tel:+919393553232" aria-label="Call South India"><i className="fa-solid fa-headset" /></a>
              <div className="add-content">
                <p>South India<br />+91 93935 53232</p>
              </div>
            </div>
            <div className="icon1">
              <a href="tel:18003093232" aria-label="Call toll free"><i className="fa-solid fa-location-dot" /></a>
              <div className="add-content">
                <p>Open 7 days<br />1800-309-3232</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
