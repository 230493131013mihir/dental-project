import React, { useEffect, useMemo, useState } from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../redux/slice/authenthication.slice";
import { getPatients } from "../../redux/slice/patient.slice";

function RegisterDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);
  const patientState = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const registeredPatients = useMemo(
    () => (Array.isArray(patientState.patient) ? patientState.patient : []),
    [patientState.patient],
  );

  const userSchema = object({
    name: string().required("Please enter your name"),
    email: string().required("Please enter email id").email("Invalid email format"),
    password: string()
      .required("Please enter your password")
      .min(6, "Minimum 6 characters")
      .matches(/[A-Z]/, "1 uppercase required")
      .matches(/[a-z]/, "1 lowercase required")
      .matches(/[0-9]/, "1 number required")
      .matches(/[^A-Za-z0-9]/, "1 special character required"),
    phone: string()
      .required("Enter phone number")
      .matches(/^[0-9]{10}$/, "Must be 10 digits"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      const alreadyRegistered = registeredPatients.some(
        (patient) => String(patient.phone || patient.mobile_no) === values.phone,
      );

      if (alreadyRegistered) {
        setFieldError("phone", "This mobile number is already registered.");
        setNotice({
          type: "error",
          title: "Number already registered",
          text: "Please login with this mobile number's account or use another number.",
        });
        return;
      }

      setLoading(true);
      const result = await dispatch(register(values));
      setLoading(false);

      if (result.meta.requestStatus === "fulfilled" && result.payload) {
        setNotice({
          type: "success",
          title: "Registration successful",
          text: "Your account is ready. Please login to continue booking.",
        });
        resetForm();
        setTimeout(() => navigate("/login"), 900);
        return;
      }

      setNotice({
        type: "error",
        title: "Registration failed",
        text: result.payload || result.error?.message || "Please try again.",
      });
    },
  });

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="container">
          <div className="auth-grid">
            <div className="auth-visual reveal-up">
              <img src="images/register.png" alt="Patient registration" />
              <div className="auth-floating-card">
                <i className="fa-solid fa-shield-heart" />
                <div>
                  <strong>Secure patient profile</strong>
                  <span>Duplicate phone numbers are blocked before signup.</span>
                </div>
              </div>
            </div>

            <div className="auth-card reveal-up delay-1">
              {notice ? (
                <div className={`auth-notice ${notice.type}`}>
                  <strong>{notice.title}</strong>
                  <span>{notice.text}</span>
                </div>
              ) : null}

              <span className="badge"><i className="fa-solid fa-user-plus" /> Register</span>
              <h1>Create your dental care account</h1>
              <p>Register once, then book appointments and manage your visits from one place.</p>

              <form onSubmit={formik.handleSubmit} className="auth-form">
                <label>
                  Full Name
                  <input
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name ? <span>{formik.errors.name}</span> : null}
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : null}
                </label>

                <label>
                  Mobile Number
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="10 digit mobile number"
                    name="phone"
                    onChange={(event) => {
                      formik.setFieldValue("phone", event.target.value.replace(/\D/g, ""));
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone ? <span>{formik.errors.phone}</span> : null}
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    placeholder="Create password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : null}
                </label>

                <button type="submit" className="btn auth-submit" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="auth-switch">
                Already registered? <NavLink to="/login">Login here</NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterDetails;
