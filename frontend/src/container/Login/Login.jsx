// import React from "react";

// function Login(props) {
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
//                 <form>
//                   <h3>Login</h3>
//                   <div className="row">
                    
//                     <div className="col-12">
//                       <input type="email" placeholder="Patient Email" required />
//                     </div>
//                     <div className="col-12">
//                       <input type="password" placeholder="Patient Password" required />
//                     </div>
//                     <div className="col-12">
//                       <input
//                         type="submit"
//                         defaultValue="Submit"
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

// export default Login;


import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";

function Login() {

  const loginSchema = object({
    email: string()
      .email("Invalid email format")
      .required("Email is required"),

    password: string()
      .required("Password is required")
      .min(6, "Minimum 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: (values, { resetForm }) => {
      console.log("Login Data:", values);
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
                  <h3>Login</h3>

                  {/* EMAIL */}
                  <div className="col-12">
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
                  </div>

                  {/* PASSWORD */}
                  <div className="col-12">
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
                  </div>

                  {/* SUBMIT */}
                  <div className="col-12">
                    <button type="submit" className="btn">
                      Login
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;