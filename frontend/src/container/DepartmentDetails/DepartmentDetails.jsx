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
    <div className="container my-5" style={{marginTop: '120px'}}>
      <div className="card shadow-lg border-0">
        <div className="row g-0">
          {/* Department Image */}
          <div className="col-md-5">
            <img
              src={"http://localhost:3000/" + deptData?.department_img}
              className="img-fluid h-100 w-100 object-fit-cover rounded-start"
              alt="department Image"
              style={{width: '100%'}}
            />
          </div>
          {/* Department Details */}
          <div className="col-md-7">
            <div className="card-body p-4">
              {/* Name */}
              <h2 className="card-title mb-6" style={{ marginBottom: "20px" }}>
                {deptData?.name}
              </h2>
              {/* Description */}
              <p className="mt-3 text-muted"style={{fontSize: '20px'}}> {deptData?.description}</p>
              <hr />
              {/* Info */}
              <div className="row mb-2"style={{fontSize: '20px',marginTop: '15px'}}>
                <div className="col-sm-4 fw-bold"><i class="fa-solid fa-phone"></i></div>
                <div className="col-sm-8">{deptData?.mobile}</div>
              </div>
              <div className="row mb-2"style={{fontSize: '20px',marginTop: '10px'}}>
                <div className="col-sm-4 fw-bold"><i class="fa-solid fa-at"></i></div>
                <div className="col-sm-8"> {deptData?.email}</div>
              </div>
              <div className="row mb-2"style={{fontSize: '20px',marginTop: '10px'}}>
                <div className="col-sm-4 fw-bold"><i class="fa-solid fa-address-book"></i></div>
                <div className="col-sm-8 text-muted">{deptData?.address}</div>
              </div>
              {/* Buttons */}
              <div className="mt-4"
               style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", }}>
                <a href={`tel:${deptData?.mobile}`} className="btn btn-primary">
                  Contact department
                </a>
                <NavLink
                  to={"/department"}
                  className="btn btn-outline-secondary"
                >
                  Back
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>Our Infrastructure</h2>

      <div className="row" style={{marginTop: '20px'}}>

        {
          fInfra.map((v) => (
            <div className="col-4">
              <img src={"http://localhost:3000/" + v.insfrastructure_img} alt="" width={'300px'} height={'300px'}   style={{width: '100%'}}/>
              <h2>{v.name}</h2>
              <p>{v.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DepartmentDetails;
