// import React from "react";
// import { object, string } from "yup";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../redux/slice/authenthication.slice";
// import { NavLink } from "react-router-dom";

// function RegisterDetails(props) {

//  const dispatch = useDispatch();


//   let userschema = object({
//     name: string().required("Please enter your name"),
//     password: string().required("please enter your password"),
//     email: string().required("Please Select email id"),
//     phone: string()
//       .required("Please enter phone number")
//       .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//     },

//     validationSchema: userschema,

//     onSubmit: (values, { resetForm }) => {
//       dispatch(register(values))
//       handleClose();
//       resetForm();
//     },
//   });

//   console.log(formik.errors, formik.touched);

//   return (
//     <main>
//       <section>
//         <div className="container">
//           <div
//   className="row"
//   style={{
//     justifyContent: "space-between",
//     marginTop: "70px",
//     alignItems: "center",
//   }}
// >
//   {/* IMAGE */}
//   <div className="col-5">
//     <img
//       src="images/register.png"
//       alt=""
//       style={{
//         width: "100%",
//         height: "520px",
//         objectFit: "cover",
//         borderRadius: "25px",
//       }}
//     />
//   </div>

//   {/* REGISTER FORM */}
//   <div className="col-6">
//     <div
//       style={{
//         background: "#f9fbfc",
//         padding: "45px",
//         borderRadius: "30px",
//         boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
//         fontFamily: "Poppins, sans-serif",
//         border: "1px solid #eef2f3",
//       }}
//     >
//       <form onSubmit={formik.handleSubmit}>
//         <h3
//           style={{
//             marginBottom: "30px",
//             fontSize: "26px",
//             fontWeight: "600",
//             color: "#333",
//             textAlign: "center",
//             letterSpacing: "0.5px",
//           }}
//         >
//           Create Account ✨
//         </h3>

//         <div className="row">
//           {/* NAME */}
//           <div className="col-12" style={{ marginBottom: "18px" }}>
//             <input
//               type="text"
//               placeholder="Full Name"
//               name="name"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.name}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 borderRadius: "12px",
//                 border: "none",
//                 background: "#ffffff",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>

//           {/* EMAIL */}
//           <div className="col-12" style={{ marginBottom: "18px" }}>
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 borderRadius: "12px",
//                 border: "none",
//                 background: "#ffffff",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="col-12" style={{ marginBottom: "18px" }}>
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 borderRadius: "12px",
//                 border: "none",
//                 background: "#ffffff",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>

//           {/* PHONE */}
//           <div className="col-12" style={{ marginBottom: "25px" }}>
//             <input
//               type="text"
//               placeholder="Phone Number"
//               name="phone"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.phone}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 borderRadius: "12px",
//                 border: "none",
//                 background: "#ffffff",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>

//           {/* BUTTON */}
//           <div className="col-12">
//             <input
//               type="submit"
//               value="Create Account"
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 borderRadius: "14px",
//                 border: "none",
//                 background:
//                   "linear-gradient(135deg, #6dd5ed, #2193b0)", // 🔥 DIFFERENT COLOR
//                 color: "#fff",
//                 fontWeight: "600",
//                 fontSize: "15px",
//                 cursor: "pointer",
//                 transition: "0.3s",
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.transform = "scale(1.03)";
//                 e.target.style.boxShadow =
//                   "0 10px 25px rgba(33,147,176,0.3)";
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.transform = "scale(1)";
//                 e.target.style.boxShadow = "none";
//               }}
//             />
//           </div>
//         </div>
//       </form>

//       {/* LOGIN LINK */}
//       <p
//         style={{
//           marginTop: "20px",
//           textAlign: "center",
//           fontSize: "14px",
//           color: "#666",
//         }}
//       >
//         Already have an account?{" "}
//         <NavLink  
//           to={"/login"}
//           style={{
//             color: "#2193b0",
//             fontWeight: "600",
//             textDecoration: "none",
//           }}
//         >
//           Login
//         </NavLink>
//       </p>
//     </div>
//   </div>
// </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default RegisterDetails;

import React, { useState } from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slice/authenthication.slice";
import { NavLink } from "react-router-dom";

function RegisterDetails() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // ✅ VALIDATION
  let userschema = object({
    name: string().required("Please enter your name"),

    email: string()
      .required("Please enter email id")
      .email("Invalid email format"),

    password: string()
      .required("Please enter your password")
      .min(6, "Minimum 6 characters")
      .matches(/[A-Z]/, "1 uppercase required")
      .matches(/[a-z]/, "1 lowercase required")
      .matches(/[0-9]/, "1 number required"),

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

    validationSchema: userschema,

    onSubmit: async (values, { resetForm, setTouched }) => {
      setTouched({
        name: true,
        email: true,
        phone: true,
        password: true,
      });

      if (Object.keys(formik.errors).length > 0) {
        alert("❌ Please fix errors before submitting");
        return;
      }

      setLoading(true);

      try {
        const result = await dispatch(register(values));
        if (result.meta.requestStatus === "rejected") {
          alert(result.payload || result.error?.message || "Registration failed!");
          setLoading(false);
          return;
        }
        alert("✅ Registration successful!");
        resetForm();
      } catch (err) {
        alert("❌ Registration failed!");
      }

      setLoading(false);
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
              <div style={boxStyle}>
                <form onSubmit={formik.handleSubmit}>
                  <h3 style={{ marginBottom: "25px" }}>
                    Create Account ✨
                  </h3>

                  {/* NAME */}
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={inputStyle}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <span style={error}>{formik.errors.name}</span>
                  )}

                  {/* EMAIL */}
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    style={inputStyle}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <span style={error}>{formik.errors.email}</span>
                  )}

                  {/* PASSWORD */}
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    style={inputStyle}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <span style={error}>{formik.errors.password}</span>
                  )}

                  {/* PHONE */}
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    style={inputStyle}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <span style={error}>{formik.errors.phone}</span>
                  )}

                  {/* 🔥 BUTTON WITH FULL EFFECT */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...btn,
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.03)";
                      e.target.style.boxShadow =
                        "0 10px 25px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                    onMouseDown={(e) => {
                      e.target.style.transform = "scale(0.95)";
                    }}
                    onMouseUp={(e) => {
                      e.target.style.transform = "scale(1.03)";
                    }}
                  >
                    {loading ? "⏳ Creating..." : "Create Account"}
                  </button>
                </form>

                <p style={{ marginTop: "20px" }}>
                  Already have account?{" "}
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

// 🎨 STYLES
const boxStyle = {
  padding: "40px",
  borderRadius: "25px",
  background: "#fff",
  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
};

const error = {
  color: "red",
  fontSize: "12px",
};

const btn = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export default RegisterDetails;
