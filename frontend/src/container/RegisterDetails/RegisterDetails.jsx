import React from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slice/authenthication.slice";
import { NavLink } from "react-router-dom";

function RegisterDetails(props) {

 const dispatch = useDispatch();


  let userschema = object({
    name: string().required("Please enter your name"),
    password: string().required("please enter your password"),
    email: string().required("Please Select email id"),
    phone: string()
      .required("Please enter phone number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },

    validationSchema: userschema,

    onSubmit: (values, { resetForm }) => {
      dispatch(register(values))
      handleClose();
      resetForm();
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

  {/* REGISTER FORM */}
  <div className="col-6">
    <div
      style={{
        background: "#f9fbfc",
        padding: "45px",
        borderRadius: "30px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
        fontFamily: "Poppins, sans-serif",
        border: "1px solid #eef2f3",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <h3
          style={{
            marginBottom: "30px",
            fontSize: "26px",
            fontWeight: "600",
            color: "#333",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Create Account ✨
        </h3>

        <div className="row">
          {/* NAME */}
          <div className="col-12" style={{ marginBottom: "18px" }}>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* EMAIL */}
          <div className="col-12" style={{ marginBottom: "18px" }}>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="col-12" style={{ marginBottom: "18px" }}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* PHONE */}
          <div className="col-12" style={{ marginBottom: "25px" }}>
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* BUTTON */}
          <div className="col-12">
            <input
              type="submit"
              value="Create Account"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background:
                  "linear-gradient(135deg, #6dd5ed, #2193b0)", // 🔥 DIFFERENT COLOR
                color: "#fff",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.03)";
                e.target.style.boxShadow =
                  "0 10px 25px rgba(33,147,176,0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>
      </form>

      {/* LOGIN LINK */}
      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#666",
        }}
      >
        Already have an account?{" "}
        <NavLink  
          to={"/login"}
          style={{
            color: "#2193b0",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Login
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

export default RegisterDetails;

