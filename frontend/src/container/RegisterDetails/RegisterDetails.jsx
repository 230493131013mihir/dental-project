

// import React from "react";
// import { object, string } from "yup";
// import { useFormik } from "formik";

//   let userschema = object({
//     name: string().required("Please enter your name"),
//     password: string().required("please enter your password"),
//     email: string().required("Please Select email id"),
//     phone: string()
//       .required("Please enter phone number")
//       .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
//   });

//     const Formik = useFormik({
//       initialValues: {
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//       },
  
//       validationSchema: userschema,
  
//       onSubmit: (values, { resetForm }) => {
//         console.log(values);
//         handleClose();
//         resetForm();
//       },
//     });

//   console.log(formik.errors, formik.touched);

// function RegisterDetails(props) {
//   return (
//     <main>
//       <section>
//         <div className="container">
          
//           <div className="row" style={{ justifyContent: "space-between", marginTop: '50px' }}>
//             <div className="col-5">
//                 <img src="images/register.webp" alt="" width={"100%"} height={"500px"} />
//             </div>
//             <div className="col-6">
//               <div className="appointment">
//                 <form onSubmit={formik.handleSubmit} id="register-form">
//                   <h3>Register</h3>
//                   <div className="row">
//                     <div className="col-12">
//                       <input type="text" placeholder="Patient Name" required name="name"                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.name}
//                 helperText={
//                   formik.errors.name && formik.touched.name
//                     ? formik.errors.name
//                     : ""
//                 }/>
//                     </div>
//                     <div className="col-12">
//                       <input type="email" placeholder="Patient Email" required name="email"                onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.email}
//                 helperText={
//                   formik.errors.email && formik.touched.email
//                     ? formik.errors.email
//                     : ""
//                 }/>
//                     </div>
//                     <div className="col-12">
//                       <input type="password" placeholder="Patient Password" required name="password"                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 helperText={
//                   formik.errors.password && formik.touched.password
//                     ? formik.errors.password
//                     : ""
//                 }/>
//                     </div>
//                     <div className="col-12">
//                       <input type="phone" placeholder="Phone Number" required name="phone"                onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.phone}
//                 helperText={
//                   formik.errors.phone && formik.touched.phone
//                     ? formik.errors.phone
//                     : ""
//                 } />
//                     </div>
//                     <div className="col-12">
//                       <input
//                         type="submit"
//                         defaultValue="Appointment"
//                         className="btn"
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default RegisterDetails; 

import React from "react";
import { object, string } from "yup";
import { useFormik } from "formik";

function RegisterDetails() {

  const userschema = object({
    name: string().required("Please enter your name"),
    password: string().required("Please enter your password"),
    email: string().required("Please enter email"),
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
      console.log(values);
      resetForm();
    },
  });

  return (
    <main>
      <section>
        <div className="container">
          <div
            className="row"
            style={{ justifyContent: "space-between", marginTop: "50px" }}
          >
            <div className="col-5">
              <img
                src="images/register.webp"
                alt=""
                width={"100%"}
                height={"500px"}
              />
            </div>

            <div className="col-6">
              <div className="appointment">
                <form onSubmit={formik.handleSubmit}>
                  <h3>Register</h3>

                  {/* NAME */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div style={{ color: "red" }}>
                      {formik.errors.name}
                    </div>
                  )}

                  {/* EMAIL */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Patient Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div style={{ color: "red" }}>
                      {formik.errors.email}
                    </div>
                  )}

                  {/* PASSWORD */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Patient Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div style={{ color: "red" }}>
                      {formik.errors.password}
                    </div>
                  )}

                  {/* PHONE */}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div style={{ color: "red" }}>
                      {formik.errors.phone}
                    </div>
                  )}

                  <button type="submit" className="btn">
                    Register
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterDetails;



