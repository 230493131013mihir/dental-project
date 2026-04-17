import React from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slice/authenthication.slice";
import { NavLink } from "react-router-dom";

function RegisterDetails() {
  const dispatch = useDispatch();

  // ✅ Validation Schema
  const userschema = object({
    name: string().required("Please enter your name"),
    email: string()
      .required("Please enter email")
      .email("Invalid email format"),
    password: string().required("Please enter your password"),
    phone: string()
      .required("Please enter phone number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: userschema,
    onSubmit: async (values, { resetForm }) => {
  try {
    const res = await dispatch(register(values));

    if (res.meta.requestStatus === "fulfilled") {
      alert("🦷 Welcome to EliteDent! Your registration was successful.");
      resetForm();
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    alert("Something went wrong.");
  }
},
  });

  return (
    <main>
      <section>
        <div className="container">
          <div
            className="row"
            style={{
              justifyContent: "space-between",
              marginTop: "70px",
              alignItems: "center",
            }}
          >
            {/* IMAGE */}
            <div className="col-5">
              <img
                src="images/register.png"
                alt=""
                style={{
                  width: "100%",
                  height: "520px",
                  objectFit: "cover",
                  borderRadius: "25px",
                }}
              />
            </div>

            {/* FORM */}
            <div className="col-6">
              <div
                style={{
                  background: "#f9fbfc",
                  padding: "45px",
                  borderRadius: "30px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
                  border: "1px solid #eef2f3",
                }}
              >
                <form 
                onSubmit={formik.handleSubmit}>
                  <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Create Account ✨
                  </h3>

                  {/* NAME */}
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      style={inputStyle(formik, "name")}
                    />
                    {showError(formik, "name")}
                  </div>

                  {/* EMAIL */}
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      style={inputStyle(formik, "email")}
                    />
                    {showError(formik, "email")}
                  </div>

                  {/* PASSWORD */}
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      style={inputStyle(formik, "password")}
                    />
                    {showError(formik, "password")}
                  </div>

                  {/* PHONE */}
                  <div style={{ marginBottom: "20px" }}>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      style={inputStyle(formik, "phone")}
                    />
                    {showError(formik, "phone")}
                  </div>

                  {/* SUBMIT */}
                  <button type="submit" style={buttonStyle}>
                    Join EliteDent Family 🦷
                  </button>
                </form>

                {/* LOGIN LINK */}
                <p style={{ marginTop: "20px", textAlign: "center" }}>
                  Already have an account?{" "}
                  <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterDetails;

//
// ✅ Helper Functions
//

const showError = (formik, field) => {
  return (
    (formik.touched[field] || formik.submitCount > 0) &&
    formik.errors[field] && (
      <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
        {formik.errors[field]}
      </p>
    )
  );
};

const inputStyle = (formik, field) => ({
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  outline: "none",
  fontSize: "14px",
  border:
    (formik.touched[field] || formik.submitCount > 0) &&
    formik.errors[field]
      ? "1px solid red"
      : "1px solid #ddd",
});

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg, #6dd5ed, #2193b0)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};