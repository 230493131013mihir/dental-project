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
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="row g-0">
          {/* Branch Image */}
          <div className="col-md-5">
            <img
              src={"http://localhost:3000/" + bD.branch_img}
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt="Branch Image"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
          {/* Branch Details */}
          <div className="col-md-7">
            <div className="card-body p-4">
              {/* Branch Name */}
              <h2 className="card-title mb-6" style={{ marginBottom: "20px" }}>
                {bD.name}
              </h2>
              {/* Description */}
              <p className="card-text text-muted" style={{fontSize: '20px',marginTop: '15px'}}>Description:
                {bD.description}
              </p>
              {/* address */}

              {/* Contact Info */}
              <div className="row mb-3" style={{fontSize: '20px',marginTop: '10px'}}>
                <div className="col-sm-4 fw-bold">
                  <i class="fa-solid fa-at"></i>
                </div>
                <div className="col-sm-8">{bD.email}</div>
              </div>
              <div className="row mb-3"style={{fontSize: '20px',marginTop: '10px'}}>
                <div className="col-sm-4 fw-bold">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div className="col-sm-8">{bD.mobile_no}</div>
              </div>
              <div className="row mb-3" style={{fontSize: '20px',marginTop: '10px'}}>
                <div className="col-sm-4 fw-bold">
                  <i class="fa-solid fa-address-book"></i>
                </div>
                <p className="card-text text-muted"style={{fontSize: '20px',marginTop: '10px'}}>{bD.address}</p>
              </div>
              {/* Optional Buttons */}
              <div
                className="mt-4"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <a href={`tel:${bD.mobile_no}`} className="btn btn-primary">
                  Contact Branch
                </a>
                <NavLink to={"/branch"} className="btn btn-outline-secondary">
                  Back
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchDetails;
