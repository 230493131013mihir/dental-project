import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBranch } from "../../redux/slice/branch.slice";
import { getDepartment } from "../../redux/slice/department.slice";
import { date, number, object, string } from "yup";
import { useFormik } from "formik";
import { bookAppointment } from "../../redux/slice/appointment.slice";
import MenuItem from "@mui/material/MenuItem";

function Appointment(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranch());
    dispatch(getDepartment());

  }, []);


  const appointment = useSelector((state) => state.appointment);
    console.log(appointment);
  
  const branch = useSelector((state) => state.branch);
  const department = useSelector((state) => state.department);

  console.log(department.department);
  console.log(branch.branch);

  let userschema = object({
    branch_id: number().required("please select your branch"),
    department_id: number().required("Please Select department"),
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
      name: "",
      phone: "",
      date: "",
      time: "",
    },

    validationSchema: userschema,
    onSubmit: (values, { resetForm }) => {
      dispatch(bookAppointment(values))
      resetForm();
    },
  });

console.log(branch.branch, department.department, formik.values.branch_id);
  return (
    <main>
      <section>
        <div className="container">
          <div className="appointment">
            <form onSubmit={formik.handleSubmit} id="appointment-form">
              <h3>Make an Appointment</h3>
              <div className="row">
                <div className="col-6">
                  <select
                    name="branch_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.branch_id}
                  >
                    <option value="">--Select Branch--</option>
                    {branch.branch.map((v) => (
                      <option value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  {formik.errors.branch_id && formik.touched.branch_id ? (
                    <span className="error"> {formik.errors.branch_id}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-6">
                  <select
                    name="department_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.department_id}
                  >
                    <option value="">--Select Department--</option>
                    {department.department.map((v) => (
                      <option value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  {formik.errors.department_id && formik.touched.department_id ? (
                    <span className="error">{formik.errors.department_id}</span>
                  ) : (
                    ""
                  )}
                  {department.department
                    ?.filter((v1) => v1.branch_id == formik.values.branch_id)
                    ?.map((v) => (
                      <MenuItem key={v.id} value={v.id}>
                        {v.name}
                      </MenuItem>
                    ))}
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <span className="error">{formik.errors.name}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-6">
                  <input
                    type="phone"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <span className="error">{formik.errors.phone}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                  />
                  {formik.errors.date && formik.touched.date ? (
                    <span className="error" style={{ marginBottom: "20px" }}>
                      {formik.errors.date}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-6">
                  <select
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
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
                  </select>
                  {formik.errors.time && formik.touched.time ? (
                    <span className="error"> {formik.errors.time}</span>
                  ) : (
                    ""
                  )}
                </div>

                {/* <div className="col-12">
                  <select>
                    <option>Select Doctor</option>
                    <option>Dr. M.D.patel</option>
                    <option>Dr. S.J.patil</option>
                  </select>
                </div> */}
                <div className="col-12">
                  <input
                    type="submit"
                    defaultValue="Appointment"
                    className="btn"
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
