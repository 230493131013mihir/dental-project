import React from "react";
import { useEffect } from "react";
import { getMyAppointment } from "../../redux/slice/appointment.slice";
import { useDispatch, useSelector } from "react-redux";
import { getBranch } from "../../redux/slice/branch.slice";
import { getDepartment } from "../../redux/slice/department.slice";
import { getTreatment } from "../../redux/slice/treatment.slice";

function MyAppointment(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAppointment());
    dispatch(getBranch());
    dispatch(getDepartment());
    dispatch(getTreatment());
  }, []);

  const myApt = useSelector((state) => state.appointment);

  const branch = useSelector((state) => state.branch);
  const department = useSelector((state) => state.department);
  const treatment = useSelector((state) => state.treatment);

  console.log(myApt.myAppointment);
  console.log(branch.branch);
  console.log(department.department);



const sData = myApt.myAppointment.slice().sort((a, b) => new Date(b.date) - new Date(a.date))

console.log(sData);

          
  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>My Appointment</h2>

      <div className="row">
        {sData?.map((v) => (
            <>
              <div className="col-6">
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    margin: "10px 0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 4px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    {v.name}
                  </h3>

                  <p
                    style={{
                      margin: "2px 0",
                      fontSize: "14px",
                      color: "#4b5563",
                    }}
                  >
                    📞 {v.phone}
                  </p>

                  <p
                    style={{
                      margin: "2px 0",
                      fontSize: "14px",
                      color: "#4b5563",
                    }}
                  >
                    🏥 {branch.branch?.find((v1) => v1.id == v.branch_id)?.name}
                  </p>

                  <p
                    style={{
                      margin: "2px 0",
                      fontSize: "14px",
                      color: "#4b5563",
                    }}
                  >
                    🦷{" "}
                    {
                      department.department?.find(
                        (v1) => v1.id == v.department_id,
                      )?.name
                    }
                  </p>

                  <div
                    style={{
                      marginTop: "6px",
                      paddingTop: "6px",
                      borderTop: "1px solid #f1f5f9",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    <span>{new Date(v.date)?.toLocaleDateString()}</span>
                    <span>{v.time}</span>
                             

                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default MyAppointment;
