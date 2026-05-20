import React, { useState } from 'react';

function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
      if (!email.trim()) {
        alert("Please enter your email address.");
        return;
      }

      alert("Thank you! We will contact you soon.");
      setEmail("");
    };

    return (
    <footer>
  <div className="container">
    <div className="row footer-top">
      <div className="col-lg-6">
        <div className="bottom-footer">
          <div className="heading">
            <h2>Achieve Your Dreams Smile With Us </h2>
          </div>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="bottom-footer">
          <div className="heading">
            <p className="footer-para">Smile brighter today!
              Affordable dental care for the whole family.
              Book your appointment and shine with confidence!"</p>
            <form action>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="footer-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="button"
                defaultValue="Submit Now"
                className="btn footer-btn"
                onClick={handleSubscribe}
              />
            </form></div>
        </div>
      </div>
    </div>
    <div className="row footer-bottom">
      <div className="col-sm-6 col-lg-3">
        <div className="footer-widget">
          <div className="widget-content">
            <img src="images/logo-white.png" alt="logoimg" />
            <p>Medlife offers healthcare solutions, medicines, diagnostics, and wellness products for
              better dental.</p>
            <div className="widget-icon">
              <a href="#">
                <i className="fa-brands fa-facebook-f" /></a>
              <a href="#">
                <i className="fa-brands fa-twitter" /></a>
              <a href="#">
                <i className="fa-brands fa-linkedin-in" /></a>
              <a href="#">
                <i className="fa-brands fa-pinterest-p" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3 quick">
        <h3>Quick Link</h3>
        <ul>
          <li><a href="#">Company</a></li>
          <li><a href="#">About-Us</a></li>
          <li><a href="#">Appointment</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="col-sm-6 col-lg-3 timetable">
        <h3>Schedule Time</h3>
        <p>Mon - Thu: 09:00 -06:00</p>
        <p>Saturday: 09:00 -06:00</p>
        <p>Sunday: Off Day</p>
      </div>
      <div className="col-sm-6 col-lg-3 address">
        <h3>Address</h3>
        <div className="address-icon">
          <div className="icon1">
            <a href="#">
              <i className="fa-solid fa-location-dot" /></a>
            <div className="add-content">
              <p>123 Health Avenue</p>
            </div>
          </div>
          <div className="address-icon">
            <div className="icon1">
              <a href="#">
                <i className="fa-solid fa-location-dot" /></a>
              <div className="add-content">
                <p>510 kyros bussiness hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></footer>

    );
}

export default Footer;
