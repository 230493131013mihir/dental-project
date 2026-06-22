import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBranch } from "../../redux/slice/branch.slice";
import { getDepartment } from "../../redux/slice/department.slice";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import { bookAppointment, getAppointment } from "../../redux/slice/appointment.slice";
import { getUser } from "../../redux/slice/user.slice";

const COMMON_TIMESLOTS = [
  { id: "09:00-11:00", label: "09:00 AM - 11:00 AM" },
  { id: "12:00-02:00", label: "12:00 PM - 02:00 PM" },
  { id: "04:00-06:00", label: "04:00 PM - 06:00 PM" },
];

const SLOT_LIMIT = 3;

const isSunday = (value) => {
  if (!value) return false;
  return new Date(`${value}T00:00:00`).getDay() === 0;
};

const today = new Date().toISOString().split("T")[0];

function Appointment() {
  const dispatch = useDispatch();
  const [paymentStep, setPaymentStep] = useState(null);
  const [demoOtp, setDemoOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getUser());
    dispatch(getAppointment());
  }, [dispatch]);

  const appointment = useSelector((state) => state.appointment);
  console.log(appointment);

  const authenthication = useSelector((state) => state.authenthication);

  const branch = useSelector((state) => state.branch);
  const department = useSelector((state) => state.department);
  const user = useSelector((state) => state.user);

  console.log(department.department);
  console.log(branch.branch);
  console.log(user.user);
  let userschema = object({
    branch_id: number().required("please select your branch"),
    department_id: number().required("Please Select department"),

    doctor_id: string().required("Please Select doctor"),
    name: string().required("Please enter your name"),
    phone: string()
      .required("Please enter phone number")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    date: string()
      .required("Please Select your date")
      .test("not-sunday", "Sunday is a holiday. Please select another date.", (value) => !isSunday(value)),
    time: string().required("Please Select your time"),
  });

  const appointmentFee = paymentStep?.payment_amount || 300;

  const formik = useFormik({
    initialValues: {
      branch_id: "",
      department_id: "",
     
      doctor_id: "",
      name: "",
      phone: "",
      date: "",
      time: "",
    },

    validationSchema: userschema,
    onSubmit: async (values) => {
      const selectedSlot = COMMON_TIMESLOTS.find((slot) => slot.id === values.time);
      const currentCount = getSlotBookingCount(values.time);

      if (isSunday(values.date)) {
        alert("Sunday is a holiday. Please select another date.");
        return;
      }

      if (currentCount >= SLOT_LIMIT) {
        alert("This appointment slot is full. Please select another slot.");
        return;
      }

      // eslint-disable-next-line react-hooks/purity
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      setDemoOtp(otp);
      setEnteredOtp("");
      setOtpError("");
      setPaymentStep({
        ...values,
        payment_amount: values.department_id ? 500 : 300,
        payment_method: "demo_upi",
        payment_status: "pending",
        // eslint-disable-next-line react-hooks/purity
        demo_transaction_id: `DEMO-${Date.now()}`,
        time_label: selectedSlot?.label || values.time,
      });
    },
  });

  const navigate = useNavigate();

  if (authenthication.patient == null) {
    // alert("Please login first.")
    navigate("/login");
  }

  const existingAppointments = Array.isArray(appointment.appointment)
    ? appointment.appointment
    : [];

  const getSlotBookingCount = (slotId) =>
    existingAppointments.filter(
      (item) =>
        String(item.branch_id) === String(formik.values.branch_id) &&
        String(item.department_id) === String(formik.values.department_id) &&
        String(item.doctor_id) === String(formik.values.doctor_id) &&
        String(item.date).slice(0, 10) === String(formik.values.date) &&
        String(item.time) === String(slotId),
    ).length;

  const selectedDateIsSunday = isSunday(formik.values.date);
  const selectedDoctorName =
    user.user?.find((doctor) => String(doctor.id) === String(formik.values.doctor_id))?.name ||
    "selected doctor";

  return (
    <main className="appointment-page">
      <section className="appointment-hero">
        <div className="container">
          <div className="appointment-shell reveal-up">
            <div className="appointment-art">
              <img src="images/booking-img.jpg" alt="Dental booking" />
              <div className="appointment-rules-card">
                <i className="fa-solid fa-calendar-check" />
                <div>
                  <strong>Common daily slots</strong>
                  <span>3 slots per doctor, max {SLOT_LIMIT} bookings per slot. Sunday is holiday.</span>
                </div>
              </div>
            </div>
            <div className="appointment appointment-panel">
            <form onSubmit={formik.handleSubmit}>
              <span className="badge"><i className="fa-solid fa-calendar-check" /> Appointment</span>
              <h3>Book your dental visit</h3>
              <p className="appointment-note">
                Select a doctor and one of the three daily slots. Full slots are disabled automatically.
              </p>

              <div className="row">
                {/* Branch */}
                <div className="col-6">
                  <select
                    name="branch_id"
                    onChange={(event) => {
                      formik.handleChange(event);
                      formik.setFieldValue("department_id", "");
                      formik.setFieldValue("doctor_id", "");
                      formik.setFieldValue("time", "");
                    }}
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
                    onChange={(event) => {
                      formik.handleChange(event);
                      formik.setFieldValue("doctor_id", "");
                      formik.setFieldValue("time", "");
                    }}
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
                    name="doctor_id"
                    onChange={(event) => {
                      formik.handleChange(event);
                      formik.setFieldValue("time", "");
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.doctor_id}
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

                  {formik.errors.doctor_id && formik.touched.doctor_id && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.doctor_id}
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
                    min={today}
                    onChange={(event) => {
                      formik.handleChange(event);
                      formik.setFieldValue("time", "");
                    }}
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
                  <div className="common-slot-grid">
                    {COMMON_TIMESLOTS.map((slot) => {
                      const booked = getSlotBookingCount(slot.id);
                      const isFull = booked >= SLOT_LIMIT;
                      const isDisabled =
                        !formik.values.branch_id ||
                        !formik.values.department_id ||
                        !formik.values.doctor_id ||
                        !formik.values.date ||
                        selectedDateIsSunday ||
                        isFull;

                      return (
                        <button
                          type="button"
                          key={slot.id}
                          className={`common-slot ${formik.values.time === slot.id ? "active" : ""} ${isFull ? "full" : ""}`}
                          disabled={isDisabled}
                          onClick={() => formik.setFieldValue("time", slot.id)}
                        >
                          <strong>{slot.label}</strong>
                          <span>
                            {selectedDateIsSunday
                              ? "Sunday holiday"
                              : isFull
                                ? "Appointment full"
                                : `${SLOT_LIMIT - booked} seat${SLOT_LIMIT - booked === 1 ? "" : "s"} left`}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedDateIsSunday ? (
                    <div className="slot-warning">
                      Sunday is a holiday. Please select another date.
                    </div>
                  ) : formik.values.doctor_id && formik.values.date ? (
                    <div className="slot-helper">
                      Showing common slots for {selectedDoctorName}. Each slot accepts only {SLOT_LIMIT} appointments.
                    </div>
                  ) : (
                    <div className="slot-helper">
                      Select branch, department, doctor and date to activate slots.
                    </div>
                  )}

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
        </div>
      </section>

      {paymentStep && (
        <div style={modalBackdropStyle}>
          <div style={modalStyle}>
            <div style={demoBadgeStyle}>Demo only</div>
            <h3 style={modalTitleStyle}>Verify Demo Payment</h3>
            <p style={modalTextStyle}>
              This is a fake payment flow for testing appointments. No real
              money is charged and no payment details are collected.
            </p>

            <div style={summaryStyle}>
              <span>Appointment fee</span>
              <strong>Rs. {appointmentFee}</strong>
            </div>
            <div style={summaryStyle}>
              <span>Method</span>
              <strong>Demo UPI</strong>
            </div>
            <div style={otpBoxStyle}>
              <span>Demo OTP</span>
              <strong>{demoOtp}</strong>
            </div>

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => {
                setEnteredOtp(e.target.value.replace(/\D/g, ""));
                setOtpError("");
              }}
              style={otpInputStyle}
            />
            {otpError && <span style={otpErrorStyle}>{otpError}</span>}

            <div style={modalActionsStyle}>
              <button
                type="button"
                onClick={() => {
                  setPaymentStep(null);
                  setDemoOtp("");
                  setEnteredOtp("");
                  setOtpError("");
                }}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isBooking}
                onClick={async () => {
                  if (enteredOtp !== demoOtp) {
                    setOtpError(
                      "Invalid demo OTP. Please enter the OTP shown above."
                    );
                    return;
                  }

                  setIsBooking(true);
                  const result = await dispatch(
                    bookAppointment({
                      ...paymentStep,
                      payment_status: "paid",
                      payment_verified: true,
                      payment_amount: appointmentFee,
                    })
                  );
                  setIsBooking(false);

                  if (result.payload) {
                    alert(
                      "Your appointment is booked with demo payment verified."
                    );
                    formik.resetForm();
                    setPaymentStep(null);
                    navigate("/");
                  } else {
                    setOtpError("Appointment booking failed. Please try again.");
                  }
                }}
                style={{
                  ...verifyButtonStyle,
                  opacity: isBooking ? 0.75 : 1,
                }}
              >
                {isBooking ? "Booking..." : "Verify OTP & Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.62)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 9999,
};

const modalStyle = {
  width: "min(100%, 460px)",
  background: "#ffffff",
  borderRadius: "16px",
  padding: "28px",
  boxShadow: "0 24px 70px rgba(15, 23, 42, 0.28)",
};

const demoBadgeStyle = {
  display: "inline-flex",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "#dcfce7",
  color: "#166534",
  fontSize: "13px",
  fontWeight: 700,
  marginBottom: "14px",
};

const modalTitleStyle = {
  margin: "0 0 10px",
  color: "#0f172a",
  fontSize: "26px",
};

const modalTextStyle = {
  margin: "0 0 18px",
  color: "#475569",
  lineHeight: 1.6,
};

const summaryStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #e2e8f0",
  color: "#334155",
};

const otpBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "18px 0 14px",
  padding: "14px",
  borderRadius: "12px",
  background: "#eff6ff",
  color: "#1e3a8a",
};

const otpInputStyle = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "18px",
  letterSpacing: "4px",
  textAlign: "center",
  outline: "none",
};

const otpErrorStyle = {
  marginTop: "8px",
  color: "#dc2626",
  fontSize: "13px",
};

const modalActionsStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "22px",
};

const cancelButtonStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#334155",
  fontWeight: 700,
};

const verifyButtonStyle = {
  flex: 2,
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
  color: "#ffffff",
  fontWeight: 800,
};

export default Appointment;
