import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { object, string } from "yup";
import { login } from "../../redux/slice/authenthication.slice";
import { NavLink, useNavigate } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let userschema = object({
    password: string().required("please Enter your password"),
    email: string().required("Please Enter email id"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: userschema,

onSubmit: async (values, { resetForm }) => {
  try {
    const res = await dispatch(login(values));

    if (res.meta.requestStatus === "fulfilled") {
      alert("🦷 Welcome back! Login successful. Keep smiling 😁");
      navigate("/");
      resetForm();
    } else {
      alert("Invalid email or password ❌");
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
},
  });

  console.log(formik.errors, formik.touched);
  return (
    <main>
      <section>
        <div className="container">
<div
      className="row"
      style={{
        marginTop: "70px",
        alignItems: "center",
      }}
    >
      {/* LEFT IMAGE */}
      <div className="col-6">
        <img
          src="images/login.png"
          alt=""
          style={{
            width: "100%",
            height: "550px",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="col-6">
        <div
          style={{
            background: "#ffffff",
            padding: "50px 45px",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            fontFamily: "Poppins, sans-serif",
            borderTop: "5px solid #009688", // 🔥 dental accent
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <h3
              style={{
                textAlign: "left",
                marginBottom: "30px",
                fontSize: "28px",
                fontWeight: "600",
                color: "#026df8",
              }}
            >
              Welcome Back to EliteDent 🦷
            </h3>

            {/* EMAIL */}
            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  fontSize: "13px",
                  color: "#555",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  outline: "none",
                  fontSize: "14px",
                  transition: "0.3s",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid #009688")
                }
               
              />

              {formik.errors.email && formik.touched.email && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.email}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: "30px" }}>
              <label
                style={{
                  fontSize: "13px",
                  color: "#555",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  outline: "none",
                  fontSize: "14px",
                  transition: "0.3s",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid #009688")
                }
                
              />

              {formik.errors.password && formik.touched.password && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.password}
                </span>
              )}
            </div>

            {/* BUTTON */}
            <div>
              <input
                type="submit"
                value="Login to Your Smile 😁"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#0cadf8e7",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#0484fc";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#0478fc";
                }}
              />
            </div>
          </form>

          {/* REGISTER */}
          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              color: "#555",
            }}
          >
            Don’t have an account?{" "}
            <NavLink
              to={"/register"}
              style={{
                color: "#009688",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>

        </div>
      </section>
    </main>
  );
}

export default Login;
