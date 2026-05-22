// import React from "react";
// import { useEffect } from "react";
// import { getMyAppointment } from "../../redux/slice/appointment.slice";
// import { useDispatch, useSelector } from "react-redux";
// import { getBranch } from "../../redux/slice/branch.slice";
// import { getDepartment } from "../../redux/slice/department.slice";
// import { getTreatment } from "../../redux/slice/treatment.slice";
// import { getTimeslot } from "../../redux/slice/timeslot.slice";

// import { useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import IconButton from "@mui/material/IconButton";
// import { useParams } from "react-router-dom";

// function MyAppointment(props) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getMyAppointment());
//     dispatch(getBranch());
//     dispatch(getDepartment());
//     dispatch(getTreatment());
//     dispatch(getTimeslot());
//   }, []);

//   const myApt = useSelector((state) => state.appointment);

//   const branch = useSelector((state) => state.branch);
//   const department = useSelector((state) => state.department);
//   const treatment = useSelector((state) => state.treatment);
//   const timeslot = useSelector((state) => state.timeslot);

//   console.log(myApt.myAppointment);
//   console.log(branch.branch);
//   console.log(department.department);
//   console.log(treatment.treatment);
//   console.log(timeslot.timeslot);

//   const { id } = useParams();

//   console.log(id);

//   const sData = myApt.myAppointment
//     .slice()
//     .sort((a, b) => new Date(b.date) - new Date(a.date));

//   console.log(sData);

//   return (
//     <div className="container" style={{ marginTop: "120px" }}>
//       <h2 style={{ textAlign: "center", margin: "20px 0" }}>My Appointment</h2>

//       <div className="row">
//         {sData?.map((v) => (
//           <>
//             <div className="col-6">
//               <div
//                 style={{
//                   background: "#ffffff",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "10px",
//                   padding: "14px 16px",
//                   margin: "10px 0",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//                   fontFamily: "Arial, sans-serif",
//                 }}
//               >
//                 <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                   <IconButton
//                     onClick={() =>
//                       navigate("/MyAppointmentEdit", {
//                         state: { appointment_id: v.id },
//                       })
//                     }
//                     size="small"
//                     color="primary"
//                   >
//                     <EditIcon />
//                   </IconButton>
//                 </div>
//                 <h3
//                   style={{
//                     margin: "0 0 4px",
//                     fontSize: "16px",
//                     fontWeight: "600",
//                     color: "#111827",
//                   }}
//                 >
//                   {v.name}
//                 </h3>

//                 <p
//                   style={{
//                     margin: "2px 0",
//                     fontSize: "14px",
//                     color: "#4b5563",
//                   }}
//                 >
//                   📞 {v.phone}
//                 </p>

//                 <p
//                   style={{
//                     margin: "2px 0",
//                     fontSize: "14px",
//                     color: "#4b5563",
//                   }}
//                 >
//                   🏥 {branch.branch?.find((v1) => v1.id == v.branch_id)?.name}
//                 </p>

//                 <p
//                   style={{
//                     margin: "2px 0",
//                     fontSize: "14px",
//                     color: "#4b5563",
//                   }}
//                 >
//                   🦷{" "}
//                   {
//                     department.department?.find(
//                       (v1) => v1.id == v.department_id,
//                     )?.name
//                   }
//                 </p>

//                 <div
//                   style={{
//                     marginTop: "6px",
//                     paddingTop: "6px",
//                     borderTop: "1px solid #f1f5f9",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#6b7280",
//                   }}
//                 >
//                   <span>{new Date(v.date)?.toLocaleDateString()}</span>
//                   <span>
//                     {
//                       timeslot.timeslot?.find((v1) => v1.user_id == v.time)
//                         ?.starttime
//                     }
//                     -
//                     {
//                       timeslot.timeslot?.find((v1) => v1.user_id == v.time)
//                         ?.endtime
//                     }
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyAppointment;

import React, { useEffect } from "react";
import { getMyAppointment } from "../../redux/slice/appointment.slice";
import { useDispatch, useSelector } from "react-redux";
import { getBranch } from "../../redux/slice/branch.slice";
import { getDepartment } from "../../redux/slice/department.slice";
import { getTreatment } from "../../redux/slice/treatment.slice";
import { getTimeslot } from "../../redux/slice/timeslot.slice";
import { getUser } from "../../redux/slice/user.slice";

import { Navigate, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BadgeIcon from "@mui/icons-material/Badge";

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
  }, []);

  const myApt = useSelector((state) => state.appointment);
  const authenthication = useSelector((state) => state.authenthication);
  const branch = useSelector((state) => state.branch);
  const department = useSelector((state) => state.department);
  const timeslot = useSelector((state) => state.timeslot);
  const user = useSelector((state) => state.user);

  const sData = myApt.myAppointment
    ?.slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!authenthication.patient) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 40px 100px",
        background: "linear-gradient(135deg, #e0f2fe, #f0fdfa)",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: "36px",
          marginBottom: "50px",
          color: "#0f172a",
          letterSpacing: "1px",
        }}
      >
        My Appointments
      </h1>

      <div className="row">
        {sData?.map((v) => (
          <div className="col-lg-6 col-md-6 col-12" key={v.id}>
            <div
              style={{
                display: "flex",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "30px",
                background: "#ffffff",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.06)",
                transition: "all 0.35s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) scale(1.01)";
                e.currentTarget.style.boxShadow =
                  "0 25px 60px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0,0,0,0.12)";
              }}
            >
              {/* LEFT STRIP */}
              <div
                style={{
                  width: "6px",
                  background:
                    "linear-gradient(180deg, #06b6d4, #3b82f6)",
                }}
              ></div>

              {/* CONTENT */}
              <div style={{ padding: "24px", flex: 1 }}>
                {/* EDIT BUTTON */}
                <IconButton
                  onClick={() =>
                    navigate("/MyAppointmentEdit", {
                      state: { appointment_id: v.id },
                    })
                  }
                  size="small"
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "#e0f2fe",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                {/* NAME */}
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "#0f172a",
                    marginBottom: "12px",
                  }}
                >
                  {v.name}
                </h2>

                {/* INFO */}
                <p
                  style={{
                    margin: "6px 0",
                    color: "#334155",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  📞 {v.phone}
                </p>

                <p
                  style={{
                    margin: "6px 0",
                    color: "#334155",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  🏥{" "}
                  {branch.branch?.find((b) => b.id == v.branch_id)?.name}
                </p>

                <p
                  style={{
                    margin: "6px 0",
                    color: "#334155",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  🦷{" "}
                  {
                    department.department?.find(
                      (d) => d.id == v.department_id
                    )?.name
                  }
                </p>

                <p
                  style={{
                    margin: "6px 0",
                    color: "#334155",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  <BadgeIcon
                    sx={{
                      fontSize: 17,
                      color: "#0ea5e9",
                      mr: 0.7,
                      verticalAlign: "text-bottom",
                    }}
                  />
                  {user.user?.find((doctor) => doctor.id == v.doctor_id)
                    ?.name || "Doctor not assigned"}
                </p>

                {/* DIVIDER */}
                <div
                  style={{
                    margin: "14px 0",
                    borderTop: "2px dashed #c7d2fe",
                  }}
                ></div>

                {/* DATE TIME */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#1e293b",
                  }}
                >
                  <span>
                    📅 {new Date(v.date)?.toLocaleDateString()}
                  </span>

                  <span>
                    ⏰{" "}
                    {
                      timeslot.timeslot?.find(
                        (t) => t.id == v.time
                      )?.starttime
                    }
                    -
                    {
                      timeslot.timeslot?.find(
                        (t) => t.id == v.time
                      )?.endtime
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointment;
