import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { object, string } from "yup";
import { login } from "../../redux/slice/authenthication.slice";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const userSchema = object({
    email: string().required("Please enter email id").email("Invalid email format"),
    password: string().required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const res = await dispatch(login(values));
      setLoading(false);

      if (res.payload) {
        setNotice({
          type: "success",
          title: "Login successful",
          text: "Welcome back. Redirecting to your dental dashboard.",
        });
        resetForm();
        setTimeout(() => navigate("/"), 700);
        return;
      }

      setNotice({
        type: "error",
        title: "Account not found",
        text: "Please register first. Redirecting you to signup.",
      });
      setTimeout(() => navigate("/register"), 1100);
    },
  });

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="container">
          <div className="auth-grid reverse">
            <div className="auth-card reveal-up">
              {notice ? (
                <div className={`auth-notice ${notice.type}`}>
                  <strong>{notice.title}</strong>
                  <span>{notice.text}</span>
                </div>
              ) : null}

              <span className="badge"><i className="fa-solid fa-right-to-bracket" /> Login</span>
              <h1>Welcome back to your smile care</h1>
              <p>Login to book appointments, review your visits and continue your treatment journey.</p>

              <form onSubmit={formik.handleSubmit} className="auth-form">
                <label>
                  Email Address
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : null}
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : null}
                </label>

                <button type="submit" className="btn auth-submit" disabled={loading}>
                  {loading ? "Checking..." : "Login"}
                </button>
              </form>

              <p className="auth-switch">
                New patient? <NavLink to="/register">Create account</NavLink>
              </p>
            </div>

            <div className="auth-visual reveal-up delay-1">
              <img src="images/login.png" alt="Patient login" />
              <div className="auth-floating-card">
                <i className="fa-solid fa-wand-magic-sparkles" />
                <div>
                  <strong>Smart visit assistant</strong>
                  <span>Login unlocks appointments, reviews and visit tracking.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
