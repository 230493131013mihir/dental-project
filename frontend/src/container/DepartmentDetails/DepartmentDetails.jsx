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
    marginBottom: "20px",
    color: "#020617",
    fontWeight: "600",
    textAlign: "center",
  }}
>
  Our Infrastructure
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // FIXED SIZE
    gap: "20px",
  }}
>
  {fInfra.map((v) => (
    <div
      key={v.id}
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        transition: "0.3s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      {/* IMAGE */}
      <img
        src={"http://localhost:3000/" + v.insfrastructure_img}
        alt=""
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      {/* TEXT */}
      <div style={{ padding: "15px" }}>
        <h4 style={{ margin: 0, color: "#020617" }}>
          {v.name}
        </h4>

        <p style={{ fontSize: "14px", color: "#475569" }}>
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
