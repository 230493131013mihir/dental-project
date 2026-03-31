import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from '../../redux/slice/department.slice';
import { NavLink } from "react-router-dom";

function Home(props) {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartment());
  }, []);

    const departmentData = useSelector((state) => state.department);

    
    return (
        <main>
  {/* Hero Section */}
  <section className="hero" id="hro">
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="hero-details">
            <span className="badge"><i>●</i> Wish Your Happy Life</span>
            <h1>Personalized Care Healthier You</h1>
            <p className="sub-text">Experience personalized care tailored to your needs for a healthier,
              happier
              life. Expert medical guidance, compassionate support, and seamless</p>
            <div className="hero-cta">
              <a href="javascript:void(0);" className="btn">Discover More</a>
              <div className="call-us">
                <div className="call-image">
                  <img src="images/support.jpg" alt />
                </div>
                <div className="call-text">
                  <p>Call Us Anytime</p>
                  <a href="tel:+00 123 456 67890">+00 123 456 67890</a>
                </div>
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
                <h4><i className="fa-solid fa-gears" /> Schedule Hours</h4>
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
            <span className="badge"><i>●</i> About Us</span>
            <h2>Revolutionizing Healthcare with Personalized Care</h2>
            <p>Transforms healthcare with personalized treatments advanced technology, and compassionate
              care, ensuring a healthier</p>
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
            <a href="javascript:void(0);" className="btn">About more</a>
            <div className="call-us">
              <div className="call-image">
                <img src="images/author-img1.jpg" alt="authore image" />
              </div>
              <div className="call-text">
                <h5>Anjelina Watson</h5>
                <span className="position">Managing Director</span>
              </div>
            </div>
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
              <div><img src="images/avatar1.jpg" alt="Person-1" /></div>
              <div><img src="images/avatar2.jpg" alt="Person-2" /></div>
              <div><img src="images/avatar3.jpg" alt="Person-3" /></div>
              <div><img src="images/avatar4.jpg" alt="Person-4" /></div>
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
              <span className="badge"><i>●</i> Our department</span>
              <h2>Quality Care Across Every Medical Specialty</h2>
            </div>
            <div className="service-cta">
              <a href="javascript:void(0);" className="btn">View All department</a>
            </div>
          </div>
        </div>
      {departmentData.department?.map((v) => (
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
                      <label htmlFor>Dental</label>
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
        <div className="col-lg-6">
          <div className="treatment-img">
            <img src="images/treatment-bg.jpg" alt />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="treatment-content">
            <div className="heading">
              <span className="badge"><i>●</i> Treatment</span>
              <h2>Human Health Testing Treatment</h2>
              <p>Comprehensive human health testing and advanced treatment
                services, providing accurate diagnostics, personalized care plans, and
                effective medical solutions to promote long-term</p>
              <p>Comprehensive human health testing and advanced treatment
                services, providing accurate diagnostics, personalized care plans, </p>
            </div>
            <div className="treatment-box">
              <div className="treatment-btn">
                <a href="javascript:void(0);" className="btn">Appointment</a>
              </div>
              <div className="treatment-author" />
              <div className="call-image">
                <img src="images/author-img1.jpg" alt="authore image" />
              </div>
              <div className="call-text">
                <h5>Anjelina Watson</h5>
                <span className="position">Managing Director</span>
              </div>
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
            <span className="badge"><i>●</i> Wroking Process</span>
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
              <h4>Health <br />Assessment</h4>
              <p>Comprehensive assessment
                personalized health care</p>
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
              <h4>Treatment <br /> Plant</h4>
              <p>Customized treatment for health recovery.
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
              <h4>Medical <br /> Guidance</h4>
              <p>Expert advice for better health decisions
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
        <div className="col-xl-5">
          <div className="heading">
            <span className="badge"><i>●</i> Why Choose Us</span>
            <h2>Experience Excellence in Medical Care</h2>
            <p>Expert Receive top-quality medical care advanced treatment compassionate support &amp;
              personalized healthcare solutions for your overall well-being and recovery.</p>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="choose-img">
            <img src="images/choose-img1.jpg" alt="Choose Image" />
            <div className="play-btn">
              <a href="javascript:void(0);"><i className="fa-solid fa-play" /></a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="process process-1">
            <div className="process-icon1"><i className="fa-solid fa-stopwatch" /></div>
            <h3>Quick Response</h3>
            <p>Receive top-quality medical care advanced treatment</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="process process-2">
            <div className="process-icon1"><i className="fa-solid fa-crosshairs" /></div>
            <h3>Customer Focus</h3>
            <p>Patients first personalized and compassionate care</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="process process-3">
            <div className="process-icon1"><i className="fa-solid fa-user-doctor" /></div>
            <h3>50+ Expert Doctors</h3>
            <p>Experience doctor providing specialized quality</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="process process-4">
            <div className="process-icon1"><i className="fa-solid fa-headset" /></div>
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
          <div className="appointment">
            
          </div>
        </div>
  </section>
  {/* Team */}
  <section className="team">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="heading">
            <span className="badge"><i>●</i> Our Team</span>
            <h2>Trusted Healthcare Experts at Your Service</h2>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="doctorimg">
            <img src="images/doctor6.jpg" alt />
            <div className="link">
              <a href="#"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#"><i className="fa-brands fa-twitter" /></a>
              <a href="#"><i className="fa-brands fa-linkedin" /></a>
              <a href="#"><i className="fa-solid fa-p" /></a>
            </div>
          </div>
          <div className="about-cta">
            <div className="call-us">
              <div className="call-text">
                <a href="#">Dr. Harish Vyas</a>
                <p>Oral Medicine & amp; Radiology</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="doctorimg">
            <img src="images/doctor7.jpg" alt />
            <div className="link">
              <a href="#"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#"><i className="fa-brands fa-twitter" /></a>
              <a href="#"><i className="fa-brands fa-linkedin" /></a>
              <a href="#"><i className="fa-solid fa-p" /></a>
            </div>
          </div>
          <div className="about-cta">
            <div className="call-us">
              <div className="call-text">
                <a href="#">Dr. Alvina Roy</a>
                <p>Periodontology</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="doctorimg">
            <img src="images/doctor8.jpg" alt />
            <div className="link">
              <a href="#"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#"><i className="fa-brands fa-twitter" /></a>
              <a href="#"><i className="fa-brands fa-linkedin" /></a>
              <a href="#"><i className="fa-solid fa-p" /></a>
            </div>
          </div>
          <div className="about-cta">
            <div className="call-us">
              <div className="call-text">
                <a href="#">Dr Jay Singh</a>
                <p>Oral &amp; Maxillofacial Surgery</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="doctorimg">
            <img src="images/doctor9.jpg" alt />
            <div className="link">
              <a href="#"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#"><i className="fa-brands fa-twitter" /></a>
              <a href="#"><i className="fa-brands fa-linkedin" /></a>
              <a href="#"><i className="fa-solid fa-p" /></a>
            </div>
          </div>
          <div className="about-cta">
            <div className="call-us">
              <div className="call-text">
                <a href="#">Dr. Sarah Gill</a>
                <p>Pedodontics &amp; Preventive Dentistry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*Testimonial*/}
  <section className="testimonial" id="tst">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="heading">
            <span className="badge"><i>●</i> Testimonials</span>
            <h2>Patient Testimonials Healthier Happier Smiles</h2>
            <p>Discover real patient testimonials highlighting our expert medical care and personalized
              treatments, and compassionate support.</p>
          </div>
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="test-slide">
                  <div className="rating">
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                  </div>
                  <p className="test-data">Discover real patient testimonials highlighting our expert
                    medical care, personalized treatments, and compassionate support. See how
                    our
                    dedicated </p>
                  <div className="person">
                    <div className="call-us">
                      <div className="call-image">
                        <img src="images/author-img1.jpg" alt />
                      </div>
                      <div className="call-text">
                        <a href="#">Anjelina Watson</a>
                        <p>Health</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="test-slide">
                  <div className="rating">
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                    <div><i className="fa-solid fa-star" /></div>
                  </div>
                  <p className="test-data">Discover real patient testimonials highlighting our expert
                    medical care, personalized treatments, and compassionate support. See how
                    our
                    dedicated </p>
                  <div className="person">
                    <div className="call-us">
                      <div className="call-image">
                        <img src="images/author-img1.jpg" alt />
                      </div>
                      <div className="call-text">
                        <a href="#">Anjelina Watson</a>
                        <p>Health</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="test-image">
            <img src="images/doctormeet.jpg" alt="Testimonial Image" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* FAQ */}
  <section className="faq">
    <div className="container">
      <div className="row">
        <div className="col-5">
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
        <div className="col-7">
          <div className="faq-content">
            <div className="heading">
              <span className="badge"><i>●</i> FAQ's</span>
              <h2>Medical FAQs – Everything You Need to Know</h2>
              <p>Get answers to common medical questions, treatments &amp; healthcare services for
                informed decision-making.</p>
            </div>
            <div className="faq-accordion">
              <div className="question quest-1 open">
                <div className="acc-header">
                  <h4>How often should I have a general health check-up?</h4>
                  <i className="fa-solid fa-angle-up" />
                </div>
                <div className="acc-body">
                  <p>Seek emergency care if you experience severe chest pain, difficulty
                    breathing, sudden weakness, heavy bleeding, confusion, or loss of
                    consciousness.</p>
                </div>
              </div>
              <div className="question quest-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*blog*/}
  <section className="blog">
    <div className="container">
      <div className="heading" style={{textAlign: 'center', marginBottom: 50}}>
        <span className="badge"><i>●</i> Our Blog</span>
        <h2>Latest Health &amp; Dental Articles</h2>
        <p>Read our latest health tips and dental care advice from expert doctors.</p>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="blog-card">
            <div className="blog-img">
              <img src="images/blog-1.jpg" alt />
            </div>
            <div className="blog-content">
              <h3>How To Maintain Healthy Teeth</h3>
              <p>Simple daily habits can help keep your teeth strong and healthy.</p>
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="blog-card">
            <div className="blog-img">
              <img src="images/blog-2.jpg" alt />
            </div>
            <div className="blog-content">
              <h3>Importance Of Regular Checkups</h3>
              <p>Regular dental visits help detect problems early and keep your smile safe.</p>
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="blog-card">
            <div className="blog-img">
              <img src="images/blog-3.jpg" alt />
            </div>
            <div className="blog-content">
              <h3>Best Foods For Strong Teeth</h3>
              <p>Eating the right food helps maintain good oral health.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

    );
}

export default Home;