import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getDepartment } from "../../redux/slice/department.slice";
import { getBranch } from "../../redux/slice/branch.slice";
import { getBlog } from "../../redux/slice/blog.slice";
import { getFAQ } from "../../redux/slice/faq.slice";
import { bookAppointment, getAppointment } from "../../redux/slice/appointment.slice";
import { getReviews } from "../../redux/slice/testimonial.slice";
import { getUser } from "../../redux/slice/user.slice";
import { getTreatment } from "../../redux/slice/treatment.slice";
import { API_BASE_URL } from "../../config/api";

const defaultTreatments = [
  { name: "Root Canal Treatment", icon: "fa-tooth", text: "Pain-free care for infected or damaged teeth." },
  { name: "Dental Implants", icon: "fa-screwdriver-wrench", text: "Long-lasting replacements for missing teeth." },
  { name: "Braces & Aligners", icon: "fa-teeth-open", text: "Clear aligners and braces for straighter smiles." },
  { name: "Kids Dentistry", icon: "fa-child-reaching", text: "Gentle dental visits made easier for children." },
  { name: "Laser Dentistry", icon: "fa-wand-magic-sparkles", text: "Modern tools for precise, comfortable treatment." },
  { name: "Dental Crowns", icon: "fa-crown", text: "Strong caps to protect and restore weak teeth." },
  { name: "Tooth Cleaning", icon: "fa-sparkles", text: "Professional cleaning for healthier gums." },
  { name: "Wisdom Tooth Removal", icon: "fa-user-doctor", text: "Safe extractions with guided recovery." },
];

const helpOptions = [
  "Regular Check-up",
  "Tooth Pain",
  "Dental Implants",
  "Braces & Aligners",
  "Kids Dentistry",
  "Emergency Care",
];

const trustPoints = [
  {
    title: "World Class Treatment",
    icon: "fa-award",
    points: ["Digital X-rays and modern chair-side tools", "Premium materials for lasting restorations", "Specialists for complex dental needs"],
  },
  {
    title: "Doctor-Led Care",
    icon: "fa-user-doctor",
    points: ["Every treatment plan is reviewed by dentists", "Clear diagnosis before procedures begin", "Follow-up guidance after every visit"],
  },
  {
    title: "Safety First Clinics",
    icon: "fa-shield-heart",
    points: ["Strict sterilization workflow", "Single-use consumables where needed", "Clean, calm and patient-friendly rooms"],
  },
];

const fallbackDoctors = [
  { name: "Dr. Priya Shah", specialty: "Orthodontist", image: "images/doctor1.jpg", exp: "12 years" },
  { name: "Dr. Mihir Patel", specialty: "Implantologist", image: "images/doctor2.jpg", exp: "15 years" },
  { name: "Dr. Neha Mehta", specialty: "Root Canal Specialist", image: "images/doctor4.jpg", exp: "10 years" },
  { name: "Dr. Aakash Desai", specialty: "Kids Dentist", image: "images/doctor6.jpg", exp: "9 years" },
];

const fallbackReviews = [
  { name: "Avantika", city: "Ahmedabad", treatment: "Aligners", description: "The team explained every step clearly and my aligner journey felt very comfortable.", rating: 5 },
  { name: "Neha", city: "Surat", treatment: "Root Canal", description: "I came in with tooth pain and left relieved. The appointment process was smooth.", rating: 5 },
  { name: "Pulak", city: "Vadodara", treatment: "Dental Implant", description: "Clean clinic, confident doctor, and very helpful follow-up after the procedure.", rating: 5 },
];

const fallbackBlogs = [
  { name: "How to Remove Plaque From Teeth", description: "Daily hygiene habits and when a dentist should help.", image: "images/blog-1.jpg" },
  { name: "Dental Implant Care Guide", description: "What to expect before and after implant treatment.", image: "images/blog-2.jpg" },
  { name: "Braces or Aligners?", description: "How to choose the right teeth-straightening option.", image: "images/blog-3.jpg" },
];

const fallbackFaq = [
  { question: "How do I book a dental appointment?", answer: "Choose your branch, treatment, date and time in the booking form. If you are not logged in, the site will ask you to login first." },
  { question: "Are clinics open on weekends?", answer: "Yes, weekend appointments are available at selected branches. You can call the clinic to confirm your nearest location." },
  { question: "What should I do in a dental emergency?", answer: "Call the emergency number or book the earliest appointment. Severe pain, swelling, bleeding or trauma should be treated urgently." },
];

const COMMON_TIMESLOTS = [
  { id: "09:00-11:00", label: "09:00 AM - 11:00 AM" },
  { id: "12:00-02:00", label: "12:00 PM - 02:00 PM" },
  { id: "04:00-06:00", label: "04:00 PM - 06:00 PM" },
];

const SLOT_LIMIT = 3;
const today = new Date().toISOString().split("T")[0];

const isSunday = (value) => {
  if (!value) return false;
  return new Date(`${value}T00:00:00`).getDay() === 0;
};

const getImageUrl = (path, fallback = "images/about-img1.jpg") => {
  if (!path) return fallback;
  if (path.startsWith("http") || path.startsWith("images/")) return path;
  return `${API_BASE_URL}/${path}`;
};

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedNeed, setSelectedNeed] = useState("Regular Check-up");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planOtp, setPlanOtp] = useState("");
  const [enteredPlanOtp, setEnteredPlanOtp] = useState("");
  const [planMessage, setPlanMessage] = useState("");

  const auth = useSelector((state) => state.authenthication);
  const branchState = useSelector((state) => state.branch);
  const departmentState = useSelector((state) => state.department);
  const blogState = useSelector((state) => state.blog);
  const faqState = useSelector((state) => state.faq);
  const reviewState = useSelector((state) => state.testimonial);
  const userState = useSelector((state) => state.user);
  const appointmentState = useSelector((state) => state.appointment);
  const treatmentState = useSelector((state) => state.treatment);

  useEffect(() => {
    dispatch(getDepartment());
    dispatch(getBranch());
    dispatch(getBlog());
    dispatch(getFAQ());
    dispatch(getReviews());
    dispatch(getUser());
    dispatch(getAppointment());
    dispatch(getTreatment());
  }, [dispatch]);

  const branches = useMemo(
    () => (Array.isArray(branchState.branch) ? branchState.branch : []),
    [branchState.branch],
  );
  const departments = useMemo(
    () => (Array.isArray(departmentState.department) ? departmentState.department : []),
    [departmentState.department],
  );

  const uniqueDepartments = useMemo(() => {
    const byName = new Map();
    departments.forEach((item) => {
      if (item?.name && !byName.has(item.name)) byName.set(item.name, item);
    });
    return [...byName.values()];
  }, [departments]);

  const treatments = uniqueDepartments.length
    ? uniqueDepartments.slice(0, 8).map((item, index) => ({
        id: item.id,
        name: item.name,
        text: item.description || defaultTreatments[index % defaultTreatments.length].text,
        icon: defaultTreatments[index % defaultTreatments.length].icon,
        image: item.department_img,
        branchName: branches.find((branch) => branch.id === item.branch_id)?.name,
      }))
    : defaultTreatments;

  const treatmentRecords = Array.isArray(treatmentState.treatment)
    ? treatmentState.treatment
    : [];

  const doctorsFromApi = (userState.user || [])
    .filter((user) => user.role_id == "Doctor")
    .slice(0, 4)
    .map((doctor) => ({
      name: doctor.name,
      specialty: departments.find((dept) => dept.id == doctor.department_id)?.name || "Dental Specialist",
      image: getImageUrl(doctor.user_img, "images/doctor1.jpg"),
      exp: doctor.experience || "Expert",
    }));

  const doctors = doctorsFromApi.length ? doctorsFromApi : fallbackDoctors;
  const reviews = reviewState.testimonal?.length ? reviewState.testimonal : fallbackReviews;
  const blogs = blogState.blog?.length ? blogState.blog : fallbackBlogs;
  const faqs = faqState.faq?.length ? faqState.faq : fallbackFaq;

  const appointmentSchema = object({
    branch_id: string().required("Please select branch"),
    department_id: string().required("Please select treatment"),
    name: string().required("Please enter your name"),
    phone: string()
      .required("Please enter mobile number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    date: string()
      .required("Please select date")
      .test("not-sunday", "Sunday is a holiday. Please select another date.", (value) => !isSunday(value)),
    time: string().required("Please select time"),
  });

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      department_id: "",
      name: "",
      phone: "",
      date: "",
      time: "",
    },
    validationSchema: appointmentSchema,
    onSubmit: (values, { resetForm }) => {
      if (getHomeSlotBookingCount(values.time) >= SLOT_LIMIT) {
        alert("This appointment slot is full. Please select another slot.");
        return;
      }

      if (!auth.patient) {
        alert("Please login first to book an appointment.");
        navigate("/login");
        return;
      }

      dispatch(bookAppointment(values));
      alert("Appointment request submitted successfully.");
      resetForm();
    },
  });

  const branchOptions = branches;

  const existingAppointments = Array.isArray(appointmentState.appointment)
    ? appointmentState.appointment
    : [];

  const getHomeSlotBookingCount = (slotId) =>
    existingAppointments.filter(
      (item) =>
        String(item.branch_id) === String(formik.values.branch_id) &&
        String(item.department_id) === String(formik.values.department_id) &&
        String(item.date).slice(0, 10) === String(formik.values.date) &&
        String(item.time) === String(slotId),
    ).length;

  const quickDateIsSunday = isSunday(formik.values.date);

  const departmentOptions = departments.length
    ? departments
    : defaultTreatments.map((item, index) => ({ id: `default-${index}`, name: item.name }));

  const handleBuyPlan = (plan) => {
    // eslint-disable-next-line react-hooks/purity
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setSelectedPlan({
      ...plan,
      transactionId: `PLAN-${Date.now()}`,
    });
    setPlanOtp(otp);
    setEnteredPlanOtp("");
    setPlanMessage("");
  };

  const verifyPlanPayment = () => {
    if (enteredPlanOtp !== planOtp) {
      setPlanMessage("Invalid demo OTP. Please enter the shown OTP.");
      return;
    }

    const purchases = JSON.parse(localStorage.getItem("dental_plan_purchases") || "[]");
    localStorage.setItem(
      "dental_plan_purchases",
      JSON.stringify([
        ...purchases,
        {
          ...selectedPlan,
          status: "paid",
          purchasedAt: new Date().toISOString(),
        },
      ]),
    );
    setPlanMessage("Plan purchased successfully with demo payment.");
    setTimeout(() => {
      setSelectedPlan(null);
      setPlanOtp("");
      setEnteredPlanOtp("");
      setPlanMessage("");
    }, 900);
  };

  return (
    <main className="clove-home">
      <section className="clove-hero" id="hro">
        <div className="container">
          <div className="clove-hero-grid">
            <div className="clove-hero-copy">
              <span className="badge"><i className="fa-solid fa-circle" /> Trusted Dental Care</span>
              <h1>Expert dentists for every smile, every day.</h1>
              <p>
                Book appointments, find branches, compare treatments and get guided dental care from one working website.
              </p>
              <div className="clove-hero-actions">
                <NavLink to="/appointment" className="btn">Book Appointment</NavLink>
                <a className="clove-call" href="tel:+919667353232">
                  <i className="fa-solid fa-phone" />
                  <span>Call +91 96673 53232</span>
                </a>
              </div>
            </div>
            <div className="clove-callback-card">
              <h2>Get Instant Callback</h2>
              <p>Tell us what you need and our clinic team will help you quickly.</p>
              <form onSubmit={formik.handleSubmit}>
                <input
                  name="name"
                  placeholder="Patient name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <input
                  name="phone"
                  placeholder="10 digit mobile number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                <select value={selectedBranch} onChange={(event) => setSelectedBranch(event.target.value)}>
                  <option value="">Select branch</option>
                  {branchOptions.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                </select>
                <button type="button" className="btn" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
                  Continue Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="clove-stats">
        <div className="container">
          <div className="clove-stats-grid">
            {[
              ["30L+", "Happy Patients"],
              ["1700+", "Dentists"],
              ["715+", "Clinics"],
              ["7 Days", "Open"],
              ["55K+", "Implants"],
              ["4.9/5", "Google Rating"],
            ].map(([count, label]) => (
              <div className="clove-stat" key={label}>
                <strong>{count}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clove-finder">
        <div className="container">
          <div className="clove-split">
            <div>
              <span className="badge"><i className="fa-solid fa-location-dot" /> Find a Clinic</span>
              <h2>Locate your registered dental clinic</h2>
              <p>Only your real branches from the backend are shown here, with branch-wise appointments, departments and doctors.</p>
            </div>
            <div className="clove-find-box">
              <select value={selectedBranch} onChange={(event) => setSelectedBranch(event.target.value)}>
                <option value="">Select branch</option>
                {branchOptions.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
              </select>
              <NavLink to="/branch" className="btn">Find a Clinic</NavLink>
              <NavLink to="/department" className="clove-text-link">Find Dentist Near Me</NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="clove-help">
        <div className="container">
          <div className="heading clove-center">
            <span className="badge"><i className="fa-solid fa-circle-question" /> How can we help?</span>
            <h2>Select the option that best describes your need</h2>
          </div>
          <div className="clove-help-grid">
            {helpOptions.map((option) => (
              <button
                type="button"
                className={selectedNeed === option ? "clove-need active" : "clove-need"}
                key={option}
                onClick={() => setSelectedNeed(option)}
              >
                <i className="fa-solid fa-tooth" />
                <span>{option}</span>
              </button>
            ))}
          </div>
          <div className="clove-help-action">
            <span>{selectedNeed}</span>
            <button type="button" className="btn" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
              Continue
            </button>
          </div>
          <div className="clove-ai-card">
            <i className="fa-solid fa-wand-magic-sparkles" />
            <div>
              <h3>Smart Smile Assistant</h3>
              <p>
                Based on your selected need, we will guide you to the right department, branch and appointment flow.
              </p>
            </div>
            <strong>{selectedNeed}</strong>
          </div>
        </div>
      </section>

      <section className="clove-trust">
        <div className="container">
          <div className="clove-trust-grid">
            <div className="clove-trust-image">
              <img src="images/doctormeet.jpg" alt="Doctor consulting with patient" />
            </div>
            <div>
              <span className="badge"><i className="fa-solid fa-shield-heart" /> Why Trust Us</span>
              <h2>High quality care with clear treatment guidance</h2>
              <div className="clove-trust-list">
                {trustPoints.map((item) => (
                  <article className="clove-trust-card" key={item.title}>
                    <i className={`fa-solid ${item.icon}`} />
                    <div>
                      <h3>{item.title}</h3>
                      <ul>
                        {item.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="clove-booking" id="booking">
        <div className="container">
          <div className="clove-booking-grid">
            <div>
              <span className="badge"><i className="fa-solid fa-calendar-check" /> Book Appointment</span>
              <h2>Book an appointment at a clinic near you</h2>
              <p>Choose a branch, treatment, date and time. Logged-in patients can submit appointment requests directly.</p>
              <img src="images/booking-img.jpg" alt="Dental appointment" />
            </div>
            <form className="clove-book-form" onSubmit={formik.handleSubmit}>
              <h3>Appointment Details</h3>
              <input name="name" placeholder="Patient name" value={formik.values.name} onChange={formik.handleChange} />
              {formik.touched.name && formik.errors.name ? <span className="error">{formik.errors.name}</span> : null}
              <input name="phone" placeholder="Mobile number" value={formik.values.phone} onChange={formik.handleChange} />
              {formik.touched.phone && formik.errors.phone ? <span className="error">{formik.errors.phone}</span> : null}
              <select
                name="branch_id"
                value={formik.values.branch_id}
                onChange={(event) => {
                  formik.handleChange(event);
                  formik.setFieldValue("department_id", "");
                  formik.setFieldValue("time", "");
                }}
              >
                <option value="">Select branch</option>
                {branchOptions.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
              </select>
              {formik.touched.branch_id && formik.errors.branch_id ? <span className="error">{formik.errors.branch_id}</span> : null}
              <select
                name="department_id"
                value={formik.values.department_id}
                onChange={(event) => {
                  formik.handleChange(event);
                  formik.setFieldValue("time", "");
                }}
              >
                <option value="">Select treatment</option>
                {departmentOptions.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
              </select>
              {formik.touched.department_id && formik.errors.department_id ? <span className="error">{formik.errors.department_id}</span> : null}
              <div className="clove-form-row">
                <input
                  type="date"
                  name="date"
                  min={today}
                  value={formik.values.date}
                  onChange={(event) => {
                    formik.handleChange(event);
                    formik.setFieldValue("time", "");
                  }}
                />
                <select name="time" value={formik.values.time} onChange={formik.handleChange}>
                  <option value="">Select common slot</option>
                  {COMMON_TIMESLOTS.map((slot) => {
                    const booked = getHomeSlotBookingCount(slot.id);
                    const isFull = booked >= SLOT_LIMIT;

                    return (
                      <option
                        key={slot.id}
                        value={slot.id}
                        disabled={!formik.values.date || quickDateIsSunday || isFull}
                      >
                        {slot.label} {quickDateIsSunday ? "- Sunday holiday" : isFull ? "- Full" : `- ${SLOT_LIMIT - booked} left`}
                      </option>
                    );
                  })}
                </select>
              </div>
              {quickDateIsSunday ? <span className="error">Sunday is a holiday. Please select another date.</span> : null}
              {formik.values.date && !quickDateIsSunday ? (
                <p className="slot-helper">Three common slots are available daily. Each slot allows up to {SLOT_LIMIT} appointments.</p>
              ) : null}
              {(formik.touched.date && formik.errors.date) || (formik.touched.time && formik.errors.time) ? (
                <span className="error">{formik.errors.date || formik.errors.time}</span>
              ) : null}
              <button type="submit" className="btn">Book Now</button>
              {!auth.patient ? <p className="clove-login-note">Login is required before final booking.</p> : null}
            </form>
          </div>
        </div>
      </section>

      <section className="clove-treatments" id="serv">
        <div className="container">
          <div className="heading clove-center">
            <span className="badge"><i className="fa-solid fa-tooth" /> Treatments</span>
            <h2>Treatments for every dental need</h2>
          </div>
          <div className="clove-treatment-grid">
            {treatments.map((item, index) => (
              <NavLink
                to={item.id ? `/department_details/${item.id}` : "/department"}
                className="clove-treatment-card"
                key={`${item.name}-${index}`}
              >
                <div className="clove-treatment-icon">
                  {item.image ? <img src={getImageUrl(item.image)} alt={item.name} /> : <i className={`fa-solid ${item.icon}`} />}
                </div>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                {item.branchName ? <span>{item.branchName}</span> : <span>View treatment</span>}
              </NavLink>
            ))}
          </div>
          <div className="database-treatment-panel">
            <div>
              <span className="badge"><i className="fa-solid fa-database" /> Database Treatments</span>
              <h3>Treatments added from admin records</h3>
              <p>
                When treatment records are added in the admin treatment module, they appear here automatically.
              </p>
            </div>
            {treatmentRecords.length ? (
              <div className="database-treatment-grid">
                {treatmentRecords.slice(0, 6).map((record) => (
                  <article className="database-treatment-card" key={record.id}>
                    <img src={getImageUrl(record.treatment_img, "images/Endodontics.jpg")} alt={record.disease || "Treatment"} />
                    <div>
                      <h4>{record.disease || "Dental Treatment"}</h4>
                      <p>{record.prescription || "Treatment details added by clinic team."}</p>
                      <strong>Rs. {record.amount || 0}</strong>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-inline">
                No admin treatment records yet. Add records from Admin > Treatment and they will show here.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="clove-plans">
        <div className="container">
          <div className="heading clove-center">
            <span className="badge"><i className="fa-solid fa-id-card" /> Dental Plans</span>
            <h2>Dental health plans for families</h2>
          </div>
          <div className="clove-plan-grid">
            {[
              { title: "Premium Dental Health Plan", text: "Consultation, X-ray and treatment coupon", price: "590" },
              { title: "Super Speciality Dental Health Plan", text: "Extra savings on ortho and implant treatment", price: "750" },
            ].map((plan) => (
              <article className="clove-plan-card" key={plan.title}>
                <h3>{plan.title}</h3>
                <p>{plan.text}</p>
                <strong>Rs. {plan.price}</strong>
                <button type="button" className="btn plan-buy-btn" onClick={() => handleBuyPlan(plan)}>Buy Now</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="clove-doctors">
        <div className="container">
          <div className="heading clove-center">
            <span className="badge"><i className="fa-solid fa-user-doctor" /> Expert Doctors</span>
            <h2>India's largest team of dental experts</h2>
          </div>
          <div className="clove-doctor-grid">
            {doctors.map((doctor) => (
              <article className="clove-doctor-card" key={doctor.name}>
                <img src={doctor.image} alt={doctor.name} />
                <div>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                  <span>{doctor.exp} experience</span>
                </div>
              </article>
            ))}
          </div>
          <div className="clove-center">
            <NavLink to="/department" className="btn">Meet Our Doctors</NavLink>
          </div>
        </div>
      </section>

      <section className="clove-reviews" id="tsti">
        <div className="container">
          <div className="heading clove-center">
            <span className="badge"><i className="fa-solid fa-star" /> Patient Speaks</span>
            <h2>Happy patients, healthier smiles</h2>
          </div>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={`${review.name || review.user_id}-${index}`}>
                <article className="clove-review-card">
                  <div className="clove-stars">
                    {[...Array(5)].map((_, star) => (
                      <i key={star} className={`fa-star ${star < (review.rating || 5) ? "fa-solid" : "fa-regular"}`} />
                    ))}
                  </div>
                  <p>{review.description}</p>
                  <h3>{review.name || "Happy Patient"}</h3>
                  <span>{review.city || "Patient"} {review.treatment ? `- ${review.treatment}` : ""}</span>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          {auth.patient ? <NavLink to="/addReview" className="btn clove-review-button">Add Review</NavLink> : null}
        </div>
      </section>

      <section className="clove-insights" id="blog">
        <div className="container">
          <div className="heading clove-center">
            <span className="badge"><i className="fa-solid fa-newspaper" /> Dental Insights</span>
            <h2>Latest dental care articles</h2>
          </div>
          <div className="clove-blog-tabs">
            {["Aligners & Braces", "Crowns & Bridges", "Root Canal", "Kids Dentistry", "Gum Health"].map((tab) => <span key={tab}>{tab}</span>)}
          </div>
          <div className="clove-blog-grid">
            {blogs.slice(0, 6).map((blog, index) => (
              <article className="clove-blog-card" key={`${blog.name}-${index}`}>
                <img src={getImageUrl(blog.blog_img || blog.image, "images/blog-1.jpg")} alt={blog.name} />
                <div>
                  <h3>{blog.name}</h3>
                  <p>{blog.description}</p>
                  <a href="#blog">Read More</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="clove-faq" id="faq">
        <div className="container">
          <div className="clove-faq-grid">
            <div>
              <img className="clove-faq-image" src="images/faq-img1.png" alt="Dental FAQ assistant" />
              <span className="badge"><i className="fa-solid fa-circle-question" /> FAQs</span>
              <h2>Everything you need to know before your visit</h2>
              <p>Quick answers about appointments, weekend care, safety and dental emergencies.</p>
              <a className="clove-call-large" href="tel:+919393553232">
                <i className="fa-solid fa-headset" />
                <span>Emergency Call<br />+91 93935 53232</span>
              </a>
            </div>
            <div className="clove-faq-list">
              {faqs.slice(0, 6).map((item, index) => (
                <details key={`${item.question}-${index}`} open={index === 0}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedPlan ? (
        <div className="plan-modal-backdrop">
          <div className="plan-modal">
            <span className="badge"><i className="fa-solid fa-credit-card" /> Demo Payment</span>
            <h2>{selectedPlan.title}</h2>
            <p>{selectedPlan.text}</p>
            <div className="plan-summary">
              <span>Amount</span>
              <strong>Rs. {selectedPlan.price}</strong>
            </div>
            <div className="plan-summary">
              <span>Transaction</span>
              <strong>{selectedPlan.transactionId}</strong>
            </div>
            <div className="plan-otp-box">
              <span>Demo OTP</span>
              <strong>{planOtp}</strong>
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter OTP"
              value={enteredPlanOtp}
              onChange={(event) => {
                setEnteredPlanOtp(event.target.value.replace(/\D/g, ""));
                setPlanMessage("");
              }}
            />
            {planMessage ? <div className={planMessage.includes("success") ? "plan-message success" : "plan-message"}>{planMessage}</div> : null}
            <div className="plan-modal-actions">
              <button type="button" onClick={() => setSelectedPlan(null)}>Cancel</button>
              <button type="button" onClick={verifyPlanPayment}>Verify & Pay</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default Home;
