import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartment } from "../../redux/slice/department.slice";
import { NavLink } from "react-router-dom";

function Department(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  const departmentData = useSelector((state) => state.department);

  console.log(departmentData.department);

  return (
    <main>
      <section className="services">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="ourservices">
                <div className="service-icon">
                  <span className="badge">
                    <i>●</i> Our department
                  </span>
                  <h2>Quality Care Across Every Medical Specialty</h2>
                </div>
              </div>
            </div>
            {departmentData.department?.map((v) => (
              <div className="col-12 col-md-6 col-lg-4">

                <NavLink to={`/department_details/${v.id}`}>
                <div className="service-box">
                  <div className="service-head">
                    <div className="icons">
                      <img
                        src={"http://localhost:3000/" + v.department_img}
                        style={{
                          width: "55px",
                          height: "45px",
                        }}
                      />
                    </div>
                    <div className="label">
                      <label htmlFor>Dental</label>
                    </div>
                  </div>
                  <div className="header-dental">
                    <h4>{v.name}</h4>
                    <p>{v.description}</p>
                    <div className="read">
                      {" "}
                      <a href="#">Read more</a>
                    </div>
                  </div>
                 
                </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Department;
