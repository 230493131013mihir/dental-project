import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { object, string } from "yup";
import { login } from "../../redux/slice/authenthication.slice";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let userschema = object({
    password: string().required("please enter your password"),
    email: string().required("Please Select email id"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: userschema,

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const res =  await dispatch(login(values));
    
      console.log(res);

      if (res.payload) {
        navigate("/");
      }
      
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
                 <form onSubmit={formik.handleSubmit} id="login-form">
                  <h3>Login</h3>
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="email"
                        placeholder="Patient Email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <span
                          className="error"
                          style={{ marginBottom: "20px" }}
                        >
                          {formik.errors.email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        placeholder="Patient Password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <span
                          className="error"
                          style={{ marginBottom: "20px" }}
                        >
                          {formik.errors.password}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        defaultValue="Login"
                        className="btn"
                      />
                    </div>
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
