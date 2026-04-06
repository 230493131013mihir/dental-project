import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getBranch } from "../../redux/slice/branch.slice";
import { getDepartment } from "../../redux/slice/department.slice";
import { date, number, object, string } from "yup";
import { useFormik } from "formik";
import { bookAppointment } from "../../redux/slice/appointment.slice";
import MenuItem from "@mui/material/MenuItem";
import { getUser } from "../../redux/slice/user.slice";
import { getTimeslot } from "../../redux/slice/timeslot.slice";

function Appointment(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getUser());
    dispatch(getTimeslot());
  }, []);

  const appointment = useSelector((state) => state.appointment);
  console.log(appointment);

  const authenthication = useSelector((state) => state.authenthication);

  const branch = useSelector((state) => state.branch);
  const department = useSelector((state) => state.department);
  const user = useSelector((state) => state.user);
  const timeslot = useSelector((state) => state.timeslot);

  console.log(department.department);
  console.log(branch.branch);
  console.log(user.user);
  console.log(timeslot.timeslot);

  let userschema = object({
    branch_id: number().required("please select your branch"),
    department_id: number().required("Please Select department"),
    user_id: string().required("Please Select doctor"),
    name: string().required("Please enter your name"),
    phone: string()
      .required("Please enter phone number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    date: date().required("Please Select your date"),
    time: string().required("Please Select your time"),
  });

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      department_id: "",
      user_id: "",
      name: "",
      phone: "",
      date: "",
      time: "",
    },

    validationSchema: userschema,
    onSubmit: (values, { resetForm }) => {
      dispatch(bookAppointment(values));
      resetForm();
    },
  });

  const navigate = useNavigate();

  if (authenthication.patient == null) {
    // alert("Please login first.")
    navigate("/login");
  }

  console.log(
    branch.branch,
    department.department,
    user.user,
    timeslot.timeslot,

    formik.values.branch_id,
    formik.values.user_id,
    formik.values.time,
  );
  return (
    <main>
      <section style={{ marginTop: "120px" }}>
        <div className="container">
          <div
            className="appointment"
            style={{
              maxWidth: "900px",
              margin: "40px auto",
              padding: "30px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "25px",
                  color: "#020617",
                  fontWeight: "600",
                }}
              >
                Make an Appointment
              </h3>

              <div className="row">
                {/* Branch */}
                <div className="col-6">
                  <select
                    name="branch_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.branch_id}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      marginTop: "10px",
                      background: "#f8fafc",
                    }}
                  >
                    <option value="">--Select Branch--</option>
                    {branch.branch.map((v) => (
                      <option value={v.id}>{v.name}</option>
                    ))}
                  </select>

                  {formik.errors.branch_id && formik.touched.branch_id && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.branch_id}
                    </span>
                  )}
                </div>

                {/* Department */}
                <div className="col-6">
                  <select
                    name="department_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.department_id}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      marginTop: "10px",
                      background: "#f8fafc",
                    }}
                  >
                    <option value="">--Select Department--</option>
                    {department.department
                      ?.filter((v1) => v1.branch_id == formik.values.branch_id)
                      ?.map((v) => (
                        <option value={v.id}>{v.name}</option>
                      ))}
                  </select>

                  {formik.errors.department_id &&
                    formik.touched.department_id && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.department_id}
                      </span>
                    )}
                </div>

                {/* Doctor */}
                <div className="col-6">
                  <select
                    name="user_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_id}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      marginTop: "10px",
                      background: "#f8fafc",
                    }}
                  >
                    <option value="">--Select Doctor--</option>
                    {user.user
                      ?.filter((v1) => v1.branch_id == formik.values.branch_id)
                      ?.filter(
                        (v1) => v1.department_id == formik.values.department_id
                      )
                      ?.filter((v1) => v1.role_id == "Doctor")
                      ?.map((v) => (
                        <option value={v.id}>{v.name}</option>
                      ))}
                  </select>

                  {formik.errors.user_id && formik.touched.user_id && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.user_id}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      marginTop: "10px",
                      background: "#f8fafc",
                    }}
                  />

                  {formik.errors.name && formik.touched.name && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="col-6">
                  <input
                    type="phone"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      marginTop: "10px",
                      background: "#f8fafc",
                    }}
                  />

                  {formik.errors.phone && formik.touched.phone && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.phone}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="col-6">
                  <input
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      marginTop: "10px",
                      background: "#f8fafc",
                    }}
                  />

                  {formik.errors.date && formik.touched.date && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.date}
                    </span>
                  )}
                </div>

                {/* Time */}
                <div className="col-12">
                  <select
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      marginTop: "10px",
                      background: "#f8fafc",
                    }}
                  >
                    <option>--Select Timeslot--</option>
                    <option value={"10:00 AM -- 11:00 AM"}>
                      10:00 AM -- 11:00 AM
                    </option>
                    <option value={"11:00 AM -- 12:00 PM"}>
                      11:00 AM -- 12:00 PM
                    </option>
                    <option value={"13:00 PM -- 14:00 PM"}>
                      13:00 PM -- 14:00 PM
                    </option>

                    {timeslot.timeslot

                     
                      ?.filter((v1) => v1.user_id == formik.values.time)

                     
                      ?.map((v) => (
                        <option value={v.id}>{v.name}</option>
                      ))}
                  </select>

                  {formik.errors.time && formik.touched.time && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.time}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <div className="col-12">
                  <input
                    type="submit"
                    value="Book Appointment"
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginTop: "20px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#fff",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Appointment;
