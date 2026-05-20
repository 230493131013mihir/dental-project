import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartment } from "../../redux/slice/department.slice";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { getBranch } from "../../redux/slice/branch.slice";
import { getBlog } from "../../redux/slice/blog.slice";
import { getFAQ } from "../../redux/slice/FAQ.slice";
import { bookAppointment } from "../../redux/slice/appointment.slice";
import { getReviews } from "../../redux/slice/testimonial.slice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getUser } from "../../redux/slice/user.slice";
import MenuItem from "@mui/material/MenuItem";

function Home(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartment());
    dispatch(getBranch());
    dispatch(getBlog());
    dispatch(getFAQ());
    dispatch(getReviews());
    dispatch(getUser());
  }, []);
  const branch = useSelector((state) => state.branch);
  const departmentData = useSelector((state) => state.department);
  const department = useSelector((state) => state.department);
  const auth = useSelector((state) => state.authenthication);
  const reviews = useSelector((state) => state.testimonial);
  const users = useSelector((state) => state.user);

  // const uniqueDept = [];

  // Source - https://stackoverflow.com/a/56768137
  // Posted by V. Sambor, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-04-03, License - CC BY-SA 4.0

  const key = "name";
  const uniqueDept = [
    ...new Map(
      department?.department.map((item) => [item[key], item]),
    ).values(),
  ];

  console.log(uniqueDept);

  const doctors = users.user?.filter((v) => v.role_id == "Doctor");

  console.log(doctors);

  const blog = useSelector((state) => state.blog);

  const faq = useSelector((state) => state.faq);

  console.log(faq.faq);

  let userschema = object({
    branch_id: string().required("Please enter branch_id"),
    department_id: string().required("please enter department_id"),
    name: string().required("Please Select name"),
    phone: string()
      .required("Please enter mobile_no number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    date: string().required("Please Select date"),
    time: string().required("Please Select time"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      department_id: "",
      name: "",
      phone: "",
      date: "",
      time: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (auth.patient) {
        dispatch(bookAppointment(values));
      } else {
        alert("Please login first.");

        navigate("/login");
      }
      resetForm();
    },
  });

  // const dispatch = useDispatch(values);

  console.log(formik.errors, formik.touched);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="hro">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="hero-details">
                <span className="badge">
                  <i>●</i> Wish Your Happy Life
                </span>
                <h1>Personalized Care Healthier You</h1>
                <p className="sub-text">
                  Experience personalized care tailored to your needs for a
                  healthier, happier life. Expert medical guidance,
                  compassionate support, and seamless
                </p>
                <div className="hero-cta">
                  {/* <a href="javascript:void(0);" className="btn">
                    Discover More
                  </a> */}
                  <div className="call-us">
                    {/* <div className="call-image">
                      <img src="images/support.jpg" alt />
                    </div> */}
                    {/* <div className="call-text" style={{ textAlign: "center" }}>
                      <p>Call Us Anytime</p>
                      <a href="tel:+00 123 456 67890">+00 123 456 67890</a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="hero-image">
                <img src="images/hero-img1.png" alt="Hero Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us */}
      <section className="about" id="abt">
        <div className="container">
          <div className="row about-row">
            <div className="col-12 col-xl-6">
              <div className="about-img">
                <img src="images/about-img1.jpg" alt="About Image" />
              </div>
              <div className="about-box">
                <div className="box box-1">
                  <div className="count">12K</div>
                  <h5>Happy Our Patients</h5>
                </div>
                <div className="schedule-box">
                  <div className="content">
                    <h4>
                      <i className="fa-solid fa-gears" /> Schedule Hours
                    </h4>
                    <div className="schedule">
                      <span className="date">Mon - Thu</span>
                      <span className="time">09:00 -06:00</span>
                    </div>
                    <div className="schedule">
                      <span className="date">Saturday</span>
                      <span className="time">09:00 -06:00</span>
                    </div>
                    <div className="schedule">
                      <span className="date">Sunday</span>
                      <span className="time">Off day</span>
                    </div>
                  </div>
                </div>
                <div className="box box-2" />
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="heading">
                <span className="badge">
                  <i>●</i> About Us
                </span>
                <h2>Revolutionizing Healthcare with Personalized Care</h2>
                <p>
                  Transforms healthcare with personalized treatments advanced
                  technology, and compassionate care, ensuring a healthier
                </p>
              </div>
              <div className="about-data">
                <div className="data data-1">
                  <div className="data-icon">
                    <i className="fa-solid fa-hand-holding-medical" />
                  </div>
                  <div className="data-txt">
                    <h3>Dedicated Healthcare Provider</h3>
                    <p>We provide personalized, cutting-edge medical care</p>
                  </div>
                </div>
                <div className="data data-2">
                  <div className="data-icon">
                    <i className="fa-solid fa-tooth" />
                  </div>
                  <div className="data-txt">
                    <h3>Comprehensive Dental Care</h3>
                    <p>We provide personalized, cutting-edge medical care</p>
                  </div>
                </div>
              </div>
              <div className="about-cta">
                {/* <a href="javascript:void(0);" className="btn">
                  About more
                </a> */}
                {/* <div className="call-us">
                  <div className="call-image">
                    <img src="images/author-img1.jpg" alt="authore image" />
                  </div>
                  <div className="call-text">
                    <h5>Anjelina Watson</h5>
                    <span className="position">Managing Director</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Achive */}
      <section className="achievement">
        <div className="container">
          <div className="row achieve-row">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="appoint">
                <div className="ppl">
                  <div>
                    <img src="images/avatar1.jpg" alt="Person-1" />
                  </div>
                  <div>
                    <img src="images/avatar2.jpg" alt="Person-2" />
                  </div>
                  <div>
                    <img src="images/avatar3.jpg" alt="Person-3" />
                  </div>
                  <div>
                    <img src="images/avatar4.jpg" alt="Person-4" />
                  </div>
                </div>
                <h5>300+ Appointments Successfully</h5>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="achiev achiev-1">
                <h2>200+</h2>
                <h5>Specialists Doctors</h5>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="achiev achiev-1">
                <h2>50K</h2>
                <h5>Happy Customer</h5>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="achiev achiev-1">
                <h2>152+</h2>
                <h5>Winning Awards</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*services*/}
      <section className="services" id="serv">
        <div className="container">
          <div className="row serv-row">
            <div className="col-12">
              <div className="ourservices">
                <div className="service-icon">
                  <span className="badge">
                    <i>●</i> Our department
                  </span>
                  <h2>Quality Care Across Every Medical Specialty</h2>
                </div>
                <div className="service-cta">
                  {/* <a href="javascript:void(0);" className="btn">
                    View All department
                  </a> */}
                </div>
              </div>
            </div>
            {uniqueDept?.slice(0,6)?.map((v) => (
              <div className="col-12 col-md-6 col-lg-4">
                <NavLink to={`/department_details/${v.id}`}>
                  <div className="service-box">
                    <div className="service-head">
                      <div className="icons">
                        <img
                          src={"http://localhost:3000/" + v.department_img}
                          style={{
                            width: "55px",
                            height: "45px",
                          }}
                        />
                      </div>
                      <div className="label">
                        <label htmlFor>
                          {
                            branch.branch?.find((vv) => vv.id === v.branch_id)
                              ?.name
                          }
                        </label>
                      </div>
                    </div>
                    <div className="header-dental">
                      <h4>{v.name}</h4>
                      <p>{v.description}</p>
                      <div className="read">
                        {" "}
                        <a href="#">Read more</a>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*-treatment*/}
      <section className="treatment">
        <div className="containerfluid">
          <div className="row treatment-row">
            <div className="col-12 col-lg-6">
              <div className="treatment-img">
                <img src="images/treatment-bg.jpg" alt />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="treatment-content">
                <div className="heading">
                  <span className="badge">
                    <i>●</i> Treatment
                  </span>
                  <h2>Human Health Testing Treatment</h2>
                  <p>
                    Comprehensive human health testing and advanced treatment
                    services, providing accurate diagnostics, personalized care
                    plans, and effective medical solutions to promote long-term
                  </p>
                  <p>
                    Comprehensive human health testing and advanced treatment
                    services, providing accurate diagnostics, personalized care
                    plans,{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*working processs*/}
      <section className="Working-process">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="service-icon">
                <span className="badge">
                  <i>●</i> Wroking Process
                </span>
                <h2>Guiding You Through Every Step</h2>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card">
                <div className="sn">01</div>
                <div className="icon">
                  <i className="fa-solid fa-tooth" />
                </div>
                <div className="content">
                  <h4>
                    Health <br />
                    Assessment
                  </h4>
                  <p>Comprehensive assessment personalized health care</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card">
                <div className="sn">02</div>
                <div className="icon">
                  <i className="fa-solid fa-bed-pulse" />
                </div>
                <div className="content">
                  <h4>
                    Treatment <br /> Plant
                  </h4>
                  <p>
                    Customized treatment for health recovery.
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card">
                <div className="sn">03</div>
                <div className="icon">
                  <i className="fa-solid fa-briefcase-medical" />
                </div>
                <div className="content">
                  <h4>
                    Medical <br /> Guidance
                  </h4>
                  <p>
                    Expert advice for better health decisions
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card">
                <div className="sn">04</div>
                <div className="icon">
                  <i className="fa-solid fa-phone" />
                </div>
                <div className="content">
                  <h4>Monitoring &amp; Support</h4>
                  <p>Ongoing care for continuous health improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* why choose*/}
      <section className="choose">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-5">
              <div className="heading">
                <span className="badge">
                  <i>●</i> Why Choose Us
                </span>
                <h2>Experience Excellence in Medical Care</h2>
                <p>
                  Expert Receive top-quality medical care advanced treatment
                  compassionate support &amp; personalized healthcare solutions
                  for your overall well-being and recovery.
                </p>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="choose-img">
                <img src="images/choose-img1.jpg" alt="Choose Image" />
                <div className="play-btn">
                  <a href="javascript:void(0);">
                    <i className="fa-solid fa-play" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="process process-1">
                <div className="process-icon1">
                  <i className="fa-solid fa-stopwatch" />
                </div>
                <h3>Quick Response</h3>
                <p>Receive top-quality medical care advanced treatment</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="process process-2">
                <div className="process-icon1">
                  <i className="fa-solid fa-crosshairs" />
                </div>
                <h3>Customer Focus</h3>
                <p>Patients first personalized and compassionate care</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="process process-3">
                <div className="process-icon1">
                  <i className="fa-solid fa-user-doctor" />
                </div>
                <h3>50+ Expert Doctors</h3>
                <p>Experience doctor providing specialized quality</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="process process-4">
                <div className="process-icon1">
                  <i className="fa-solid fa-headset" />
                </div>
                <h3>24/7 Instant Support</h3>
                <p>Round-the-clock support for your healthcare</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Booking */}
      <section className="booking">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="heading">
                <span className="badge">
                  <i>●</i> Booking
                </span>
                <h2>Book Your Appointment Schedule Today</h2>
                <p>
                  Book your appointment today for expert medical &amp;
                  personalized And treatment, compassionate support for a
                  healthier.
                </p>
              </div>
              <div className="book-image">
                <img src="images/booking-img.jpg" alt="BookingImG" />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              {auth?.patient ? (
                <div className="appointment">
                  <form onSubmit={formik.handleSubmit} id="appointment-form">
                    <h3>Make an Appointment</h3>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <select
                          name="branch_id"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.branch_id}
                        >
                          <option value="">--Select Branch--</option>
                          {branch.branch.map((v) => (
                            <option value={v.id}>{v.name}</option>
                          ))}
                        </select>
                        {formik.errors.branch_id && formik.touched.branch_id ? (
                          <span className="error">
                            {" "}
                            {formik.errors.branch_id}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 col-sm-6">
                        <select
                          name="department_id"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.department_id}
                          style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "1px solid #cbd5f5",
                            marginTop: "10px",
                            background: "#f8fafc",
                          }}
                        >
                          <option value="">--Select Department--</option>
                          {department.department
                            ?.filter(
                              (v1) => v1.branch_id == formik.values.branch_id,
                            )
                            ?.map((v) => (
                              <option value={v.id}>{v.name}</option>
                            ))}
                        </select>

                        {formik.errors.department_id &&
                          formik.touched.department_id && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {formik.errors.department_id}
                            </span>
                          )}
                      </div>
                      <div className="col-12 col-sm-6">
                        <input
                          type="text"
                          placeholder="Patient Name"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                        {formik.errors.name && formik.touched.name ? (
                          <span className="error">{formik.errors.name}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 col-sm-6">
                        <input
                          type="phone"
                          placeholder="Phone Number"
                          name="phone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                          <span className="error">{formik.errors.phone}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 col-sm-6">
                        <input
                          type="date"
                          name="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.date}
                        />
                        {formik.errors.date && formik.touched.date ? (
                          <span
                            className="error"
                            style={{ marginBottom: "20px" }}
                          >
                            {formik.errors.date}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 col-sm-6">
                        <select
                          name="time"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.time}
                        >
                          <option>--Select Timeslot--</option>
                          <option value={"10:00 AM -- 11:00 AM"}>
                            10:00 AM -- 11:00 AM
                          </option>
                          <option value={"11:00 AM -- 12:00 PM"}>
                            11:00 AM -- 12:00 PM
                          </option>
                          <option value={"13:00 PM -- 14:00 PM"}>
                            13:00 PM -- 14:00 PM
                          </option>
                        </select>
                        {formik.errors.time && formik.touched.time ? (
                          <span className="error"> {formik.errors.time}</span>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* <div className="col-12">
                  <select>
                    <option>Select Doctor</option>
                    <option>Dr. M.D.patel</option>
                    <option>Dr. S.J.patil</option>
                  </select>
                </div> */}
                      <div className="col-12">
                        <input
                          type="submit"
                          defaultValue="Appointment"
                          className="btn"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div
                  className="home-login-card-wrap"
                >
                  {/* col-6 style */}
                  <div className="home-login-card-inner">
                    <div
                      style={{
                        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
                        borderRadius: "25px",
                        padding: "50px 40px",
                        textAlign: "center",
                        boxShadow: "0 15px 40px rgba(0, 150, 136, 0.2)",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      <h2
                        style={{
                          color: "#00695c",
                          fontSize: "26px",
                          marginBottom: "15px",
                          fontWeight: "600",
                          lineHeight: "1.4",
                        }}
                      >
                        Please Login to Book an Appointment
                      </h2>

                      <p
                        style={{
                          color: "#555",
                          fontSize: "15px",
                          marginBottom: "25px",
                        }}
                      >
                        Access your account to schedule your dental visit
                        quickly and easily.
                      </p>

                      <NavLink
                        to={"/login"}
                        style={{
                          display: "inline-block",
                          padding: "14px 35px",
                          background:
                            "linear-gradient(135deg, #009688, #26a69a)",
                          color: "#fff",
                          borderRadius: "35px",
                          textDecoration: "none",
                          fontWeight: "600",
                          fontSize: "16px",
                          transition: "0.3s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.boxShadow =
                            "0 8px 20px rgba(0, 150, 136, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        Login
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="team">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <span className="badge">
                  <i>●</i> Our Team
                </span>
                <h2>Trusted Healthcare Experts at Your Service</h2>
              </div>
            </div>
            {doctors?.slice(0,8)?.map((v) => (
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="doctorimg">
                  <img src={"http://localhost:3000/" + v?.user_img} alt />
                  <div className="link">
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-linkedin" />
                    </a>
                    <a href="#">
                      <i className="fa-solid fa-p" />
                    </a>
                  </div>
                </div>
                <div className="about-cta">
                  <div className="call-us">
                    <div className="call-text">
                      <a href="#">{v?.name}</a>
                      <p>
                        {
                          department?.department?.find(
                            (v1) => v1.id == v?.department_id,
                          )?.name
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*Testimonial*/}
      <section className="testimonial" id="tsti">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="heading">
                <span className="badge">
                  <i>●</i> Testimonials
                </span>
                <h2>Patient Testimonials Healthier Happier Smiles</h2>
                <p>
                  Discover real patient testimonials highlighting our expert
                  medical care and personalized treatments, and compassionate
                  support.
                </p>
              </div>
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {reviews.testimonal?.map((v) => (
                  // <SwiperSlide>
                  //   <div className="test-slide">
                  //     <div className="rating">
                  //       {[...Array(v.rating).keys()].map((v1) => (
                  //           <div>
                  //             <i className="fa-solid fa-star" />
                  //           </div>
                  //         ))}
                  //     </div>
                  //     <p className="test-data">{v.description}</p>
                  //     <div className="person">
                  //       <div className="call-us">
                  //         <div className="call-text">
                  //           <p> -
                  //             {
                  //               users.user?.find(v1 => v1.id === v.user_id)?.name
                  //             }
                  //           </p>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </SwiperSlide>
                  // <SwiperSlide>
                  //   <div
                  //     style={{
                  //       width: "100%",
                  //       padding: "25px",
                  //       borderRadius: "18px",
                  //       background: "linear-gradient(135deg, #ffffff, #f8f9fb)",
                  //       boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  //       fontFamily: "sans-serif",
                  //     }}
                  //   >
                  //     {/* ⭐ Rating */}
                  //     <div
                  //       style={{
                  //         display: "flex",
                  //         gap: "6px",
                  //         marginBottom: "15px",
                  //       }}
                  //     >
                  //       {[...Array(5)].map((_, i) => (
                  //         <i
                  //           key={i}
                  //           className={`fa-star ${
                  //             i < v.rating ? "fa-solid" : "fa-regular"
                  //           }`}
                  //           style={{
                  //             color: i < v.rating ? "#f5b301" : "#ddd",
                  //             fontSize: "18px",
                  //           }}
                  //         />
                  //       ))}
                  //     </div>

                  //     {/* 📝 Description */}
                  //     <p
                  //       style={{
                  //         fontSize: "15px",
                  //         color: "#444",
                  //         lineHeight: "1.7",
                  //         marginBottom: "20px",
                  //       }}
                  //     >
                  //       {v.description}
                  //     </p>

                  //     {/* 👤 User */}
                  //     <div
                  //       style={{
                  //         display: "flex",
                  //         alignItems: "center",
                  //         borderTop: "1px solid #eee",
                  //         paddingTop: "12px",
                  //       }}
                  //     >
                  //       <div
                  //         style={{
                  //           width: "40px",
                  //           height: "40px",
                  //           borderRadius: "50%",
                  //           background: "#e0e0e0",
                  //           marginRight: "10px",
                  //         }}
                  //       ></div>

                  //       <p
                  //         style={{
                  //           fontSize: "14px",
                  //           fontWeight: "600",
                  //           color: "#222",
                  //           margin: 0,
                  //         }}
                  //       >
                  //         {users.user?.find((v1) => v1.id === v.user_id)?.name}
                  //       </p>
                  //     </div>
                  //   </div>
                  // </SwiperSlide>
                  <SwiperSlide>
                    <div
                      style={{
                        width: "100%",
                        padding: "25px",
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #ffffff, #f8f9fb)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {/* ⭐ Rating */}
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          marginBottom: "15px",
                        }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fa-star ${
                              i < v.rating ? "fa-solid" : "fa-regular"
                            }`}
                            style={{
                              color: i < v.rating ? "#f5b301" : "#ddd",
                              fontSize: "18px",
                            }}
                          />
                        ))}
                      </div>

                      {/* 📝 Description */}
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#444",
                          lineHeight: "1.7",
                          marginBottom: "20px",
                        }}
                      >
                        {v.description}
                      </p>

                      {/* 👤 User */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderTop: "1px solid #eee",
                          paddingTop: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #f5b301, #ffd95c)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          }}
                        >
                          <i
                            className="fa-solid fa-user"
                            style={{ color: "#fff", fontSize: "16px" }}
                          />
                        </div>

                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#222",
                            margin: 0,
                          }}
                        >
                          {users.user?.find((v1) => v1.id === v.user_id)?.name}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="col-12 col-lg-6">
              <div className="test-image">
                <img src="images/doctormeet.jpg" alt="Testimonial Image" />
              </div>
            </div>
          </div>
          {auth?.patient ? (
            <div className="review-btn" style={{ marginTop: "20px" }}>
              <a href="javascript:void(0);" className="btn">
                <NavLink to="/addReview">Add Review</NavLink>
              </a>
            </div>
          ) : null}
        </div>
      </section>
      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="faq-image">
                <img src="images/oldmeet.webp" alt="FAQ Image" />
              </div>
              <div className="sos-call">
                <div className="call-us">
                  <div className="call-icon">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div className="call-text">
                    <p>Emergency Call</p>
                    <a href="tel:+1-868-842-7758">+1-868-842-7758</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="faq-content">
                <div className="heading">
                  <span className="badge">
                    <i>●</i> FAQ's
                  </span>
                  <h2>Medical FAQs – Everything You Need to Know</h2>
                  <p>
                    Get answers to common medical questions, treatments &amp;
                    healthcare services for informed decision-making.
                  </p>
                </div>
                <div
                  className="faq-accordion"
                  style={{
                    maxHeight: "360px",
                    overflowY: "auto",
                    paddingRight: "10px",
                  }}
                >
                  {faq.faq?.map((v) => (
                    <div className="question quest-1 open" key={v.id}>
                      <div className="acc-header">
                        <h4>{v.question}</h4>
                        {/* <i className="fa-solid fa-angle-up" /> */}
                      </div>
                      <div className="acc-body">
                        <p>{v.answer}</p>
                      </div>
                    </div>
                  ))}
                  {/* <div className="question quest-2">
                <div className="acc-header">
                  <h4>How do I know if my condition requires emergency care?</h4>
                  <i className="fa-solid fa-angle-up" />
                </div>
                <div className="acc-body">
                  <p>Seek emergency care if you experience severe chest pain, difficulty
                    breathing, sudden weakness, heavy bleeding, confusion, or loss of
                    consciousness.</p>
                </div>
              </div>
              <div className="question quest-3">
                <div className="acc-header">
                  <h4>What are the best ways to manage stress and anxiety?</h4>
                  <i className="fa-solid fa-angle-up" />
                </div>
                <div className="acc-body">
                  <p>Seek emergency care if you experience severe chest pain, difficulty
                    breathing, sudden weakness, heavy bleeding, confusion, or loss of
                    consciousness.</p>
                </div>
              </div>
              <div className="question quest-4">
                <div className="acc-header">
                  <h4>What tests are included in a routine health screening?</h4>
                  <i className="fa-solid fa-angle-up" />
                </div>
                <div className="acc-body">
                  <p>Seek emergency care if you experience severe chest pain, difficulty
                    breathing, sudden weakness, heavy bleeding, confusion, or loss of
                    consciousness.</p>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*blog*/}
      <section className="blog" id="blog">
        <div className="container">
          <div
            className="heading"
            style={{ textAlign: "center", marginBottom: 50 }}
          >
            <span className="badge">
              <i>●</i> Our Blog
            </span>
            <h2>Latest Health &amp; Dental Articles</h2>
            <p>
              Read our latest health tips and dental care advice from expert
              doctors.
            </p>
          </div>

          <div className="row" style={{ display: "flex" }}>
            {blog.blog?.map((v) => (
              <div className="col-12 col-md-6 col-lg-4">
                <div className="blog-card">
                  <div className="blog-img">
                    <img src={"http://localhost:3000/" + v.blog_img} />
                  </div>
                  <div className="blog-content">
                    <h3>{v.name}</h3>
                    <p>{v.description}</p>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
