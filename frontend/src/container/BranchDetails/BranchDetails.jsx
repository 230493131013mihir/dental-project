import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBranch } from "../../redux/slice/branch.slice";

function BranchDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranch());
  }, []);

  const branchData = useSelector((state) => state.branch);

  const { id } = useParams();

  console.log(id, branchData.branch);

  const bD = branchData.branch.find((v) => v.id == id);

  console.log(bD);

  return (
    <div
  className="container"
  style={{
    marginTop: "120px",
    marginBottom: "120px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "1100px",
      borderRadius: "20px",
      background: "#ffffff", // light background
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      overflow: "hidden",
      display: "flex",
      flexWrap: "wrap",
    }}
  >
    {/* LEFT IMAGE */}
    <div style={{ flex: "1 1 45%" }}>
      <img
        src={"http://localhost:3000/" + bD.branch_img}
        alt="Branch"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "350px",
          objectFit: "cover",
        }}
      />
    </div>

    {/* RIGHT CONTENT */}
    <div
      style={{
        flex: "1 1 55%",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "26px",
          marginBottom: "10px",
          color: "#020617", // dark text
          fontWeight: "600",
        }}
      >
        {bD.name}
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: "16px",
          color: "#334155",
          marginBottom: "20px",
          lineHeight: "1.6",
        }}
      >
        {bD.description}
      </p>

      {/* Email */}
      <div style={{ marginBottom: "10px", color: "#0f172a", fontSize: "16px" }}>
        📧 {bD.email}
      </div>

      {/* Phone */}
      <div style={{ marginBottom: "10px", color: "#0f172a", fontSize: "16px" }}>
        📞 {bD.mobile_no}
      </div>

      {/* Address */}
      <div style={{ marginBottom: "20px", color: "#0f172a", fontSize: "16px" }}>
        📍 {bD.address}
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "10px",
        }}
      >
        <a
          href={`tel:${bD.mobile_no}`}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Contact Branch
        </a>

        <NavLink
          to="/branch"
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid #94a3b8",
            color: "#334155",
            textDecoration: "none",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          Back
        </NavLink>
      </div>
    </div>
  </div>
</div>
  );
}

export default BranchDetails;
