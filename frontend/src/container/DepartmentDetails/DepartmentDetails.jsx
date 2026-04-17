import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getDepartment } from "../../redux/slice/department.slice";
import { getInsfrastructure } from "../../redux/slice/insfrastructure.slice";

function DepartmentDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartment());
    dispatch(getInsfrastructure());
  }, []);
  const departmentData = useSelector((state) => state.department);
  const infra = useSelector(state => state.insfrastructure)

  const { id } = useParams();

  console.log(id, departmentData.department, infra.insfrastructure);

  const deptData = departmentData.department.find((v) => v.id == id);

  console.log(deptData);

  const fInfra = infra.insfrastructure.filter(v => v.department_id === id);

  console.log(fInfra);
  

  return (
 <div
  className="container"
  style={{
    marginTop: "120px",
    marginBottom: "120px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }}
>
  <div
    className="card"
    style={{
      border: "none",
      borderRadius: "20px",
      background: "#ffffff",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      overflow: "hidden",
    }}
  >
    <div className="row g-0">

      {/* Department Image */}
      <div className="col-md-5">
        <img
          src={"http://localhost:3000/" + deptData?.department_img}
          alt="department"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "350px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Department Details */}
      <div className="col-md-7">
        <div
          className="card-body"
          style={{
            padding: "30px",
          }}
        >
          {/* Name */}
          <h2
            style={{
              fontSize: "26px",
              marginBottom: "10px",
              color: "#020617",
              fontWeight: "600",
            }}
          >
            {deptData?.name}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "16px",
              color: "#334155",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            {deptData?.description}
          </p>

          <hr />

          {/* Info */}
          <div style={{ marginTop: "15px", fontSize: "16px", color: "#0f172a" }}>
            📞 {deptData?.mobile}
          </div>

          <div style={{ marginTop: "10px", fontSize: "16px", color: "#0f172a" }}>
            📧 {deptData?.email}
          </div>

          <div style={{ marginTop: "10px", fontSize: "16px", color: "#0f172a" }}>
            📍 {deptData?.address}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px",
            }}
          >
            <a
              href={`tel:${deptData?.mobile}`}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "500",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.style.transform = "scale(1)")
              }
            >
              Contact Department
            </a>

            <NavLink
              to={"/department"}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "1px solid #94a3b8",
                color: "#334155",
                textDecoration: "none",
                fontWeight: "500",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "transparent")
              }
            >
              Back
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>


<h2
  style={{
    marginTop: "50px",
    marginBottom: "25px",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
  }}
>
  Our Infrastructure
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  }}
>
  {fInfra.map((v) => (
    <div
      key={v.id}
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔥 IMAGE BOX (PERFECT FIX) */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",   // 🔥 THIS FIXES EVERYTHING
          overflow: "hidden",
          background: "#e2e8f0",
        }}
      >
        <img
          src={"http://localhost:3000/" + v.insfrastructure_img}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>

      {/* TEXT */}
     <div
  style={{
    padding: "16px 18px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>
  {/* NAME */}
  <h4
    style={{
      margin: "0",
      fontSize: "17px",
      fontWeight: "600",
      color: "#0f172a",
      lineHeight: "1.4",
      marginBottom: "8px",

      display: "-webkit-box",
      WebkitLineClamp: 2,          // 🔥 LIMIT 2 LINES
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }}
  >
    {v.name}
  </h4>

  {/* DESCRIPTION */}
  <p
    style={{
      fontSize: "13.5px",
      color: "#64748b",
      lineHeight: "1.6",
      margin: "0",

      display: "-webkit-box",
      WebkitLineClamp: 3,          // 🔥 LIMIT 3 LINES
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }}
  >
    {v.description}
  </p>
</div>
    </div>
  ))}
</div>


    </div>
  );
}

export default DepartmentDetails;
