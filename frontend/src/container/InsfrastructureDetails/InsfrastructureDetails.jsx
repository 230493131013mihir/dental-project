import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getInsfrastructure } from "../../redux/slice/insfrastructure.slice";

function DepartmentDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInsfrastructure());
  }, []);
  const insfrastructureData = useSelector((state) => state.insfrastructure);

  const { id } = useParams();

  console.log(id, insfrastructureData.insfrastructure);

  const insfraData = insfrastructureData.insfrastructure.find((v) => v.id == id);

  console.log(insfraData);

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="row g-0">
          {/* Department Image */}
          <div className="col-md-5">
            <img
              src={"http://localhost:3000/" + insfraData.insfrastructure_img}
              className="img-fluid h-100 w-100 object-fit-cover rounded-start"
              alt="insfrastructure Image"
            />
          </div>
          {/* Department Details */}
          <div className="col-md-7">
            <div className="card-body p-4">
              {/* Name */}
              <h2 className="card-title mb-6" style={{ marginBottom: "20px" }}>
                {insfraData.name}
              </h2>
              {/* Description */}
              <p className="mt-3 text-muted"style={{fontSize: '20px'}}> {insfraData.description}</p>
              <hr />
              {/* Info */}
              <div className="row mb-2"style={{fontSize: '20px',marginTop: '15px'}}>
                <div className="col-sm-4 fw-bold"><i class="fa-solid fa-phone"></i></div>
                <div className="col-sm-8">{insfraData.mobile}</div>
              </div>
              <div className="row mb-2"style={{fontSize: '20px',marginTop: '10px'}}>
                <div className="col-sm-4 fw-bold"><i class="fa-solid fa-at"></i></div>
                <div className="col-sm-8"> {insfraData.email}</div>
              </div>
              <div className="row mb-2"style={{fontSize: '20px',marginTop: '10px'}}>
                <div className="col-sm-4 fw-bold"><i class="fa-solid fa-address-book"></i></div>
                <div className="col-sm-8 text-muted">{insfraData.address}</div>
              </div>
              {/* Buttons */}
              <div className="mt-4"
               style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", }}>
                <a href={`tel:${insfraData.mobile}`} className="btn btn-primary">
                  Contact insfrastructure
                </a>
                <NavLink
                  to={"/insfrastructure"}
                  className="btn btn-outline-secondary"
                >
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

export default DepartmentDetails;
