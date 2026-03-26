import React from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slice/authenthication.slice";

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
                <form onSubmit={formik.handleSubmit} id="register-form">
                  <h3>Register</h3>
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="text"
                        placeholder="Patient Name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.errors.name && formik.touched.name ? (
                        <span
                          className="error"
                          style={{ marginBottom: "20px" }}
                        >
                          {formik.errors.name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
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
                        type="phone"
                        placeholder="Phone Number"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                      />
                      {formik.errors.phone && formik.touched.phone ? (
                        <span
                          className="error"
                          style={{ marginBottom: "20px" }}
                        >
                          {formik.errors.phone}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        defaultValue="Register"
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

export default RegisterDetails;

