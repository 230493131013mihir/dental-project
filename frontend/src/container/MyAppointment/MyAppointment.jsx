import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BadgeIcon from "@mui/icons-material/Badge";

import { getMyAppointment } from "../../redux/slice/appointment.slice";
import { getBranch } from "../../redux/slice/branch.slice";
import { getDepartment } from "../../redux/slice/department.slice";
import { getTreatment } from "../../redux/slice/treatment.slice";
import { getTimeslot } from "../../redux/slice/timeslot.slice";
import { getUser } from "../../redux/slice/user.slice";

const COMMON_TIMESLOTS = {
  "09:00-11:00": "09:00 AM - 11:00 AM",
  "12:00-02:00": "12:00 PM - 02:00 PM",
  "04:00-06:00": "04:00 PM - 06:00 PM",
};

function MyAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyAppointment());
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getTreatment());
    dispatch(getTimeslot());
    dispatch(getUser());
  }, [dispatch]);

  const myApt = useSelector((state) => state.appointment);
  const authenthication = useSelector((state) => state.authenthication);
  const branch = useSelector((state) => state.branch);
  const department = useSelector((state) => state.department);
  const timeslot = useSelector((state) => state.timeslot);
  const user = useSelector((state) => state.user);

  if (!authenthication.patient) {
    return <Navigate to="/" replace />;
  }

  const appointments = myApt.myAppointment
    ?.slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getTimeLabel = (appointment) => {
    if (COMMON_TIMESLOTS[appointment.time]) return COMMON_TIMESLOTS[appointment.time];
    if (appointment.time_label) return appointment.time_label;

    const matchedSlot = timeslot.timeslot?.find((slot) => slot.id == appointment.time);
    return matchedSlot ? `${matchedSlot.starttime} - ${matchedSlot.endtime}` : "Time not selected";
  };

  return (
    <main className="my-appointment-page">
      <section className="my-appointment-hero">
        <div className="container">
          <span className="badge"><i className="fa-solid fa-calendar-check" /> My Appointments</span>
          <h1>My Appointments</h1>
          <p>Track your booked visits, doctor, branch, treatment, date and common slot time.</p>
        </div>
      </section>

      <section className="my-appointment-list">
        <div className="container">
          {appointments?.length ? (
            <div className="my-appointment-grid">
              {appointments.map((appointment) => (
                <article className="my-appointment-card" key={appointment.id}>
                  <IconButton
                    onClick={() =>
                      navigate("/MyAppointmentEdit", {
                        state: { appointment_id: appointment.id },
                      })
                    }
                    size="small"
                    className="my-appointment-edit"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <h2>{appointment.name}</h2>
                  <p><i className="fa-solid fa-phone" /> {appointment.phone}</p>
                  <p><i className="fa-solid fa-hospital" /> {branch.branch?.find((item) => item.id == appointment.branch_id)?.name || "Branch not found"}</p>
                  <p><i className="fa-solid fa-tooth" /> {department.department?.find((item) => item.id == appointment.department_id)?.name || "Treatment not found"}</p>
                  <p>
                    <BadgeIcon sx={{ fontSize: 17, color: "#0ea5e9", mr: 0.7, verticalAlign: "text-bottom" }} />
                    {user.user?.find((doctor) => doctor.id == appointment.doctor_id)?.name || "Doctor not assigned"}
                  </p>
                  <div className="my-appointment-meta">
                    <span>{new Date(appointment.date)?.toLocaleDateString()}</span>
                    <strong>{getTimeLabel(appointment)}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-calendar-plus" />
              <h2>No appointments yet</h2>
              <p>Book your first dental visit and it will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MyAppointment;
