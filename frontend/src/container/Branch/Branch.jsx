import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranch } from "../../redux/slice/branch.slice";
import { getDepartment } from "../../redux/slice/department.slice";
import { NavLink } from "react-router-dom";

function Branch(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranch());
    dispatch(getDepartment());
  }, []);

  const branchData = useSelector((state) => state.branch);
  const deptData = useSelector((state) => state.department);

  console.log(branchData.branch);
  console.log(deptData.department);

  return (
    <main>
      <section className="blog" style={{marginTop: '120px'}}>
        <div className="container">
          <div
            className="heading"
            style={{ textAlign: "center", marginBottom: 50 }}
          >
            <h2 style={{ marginTop: "20px" }}>Our Branches</h2>
            <p>
              Read our latest health tips and dental care advice from expert
              doctors.
            </p>
          </div>
          <div className="row" style={{ rowGap: "20px" }}>
            {branchData.branch?.map((v) => (
              <div className="col-4">
                <NavLink to={`/branch_details/${v.id}`}>
                  <div className="blog-card">
                    <div className="blog-img">
                      <img src={"http://localhost:3000/" + v.branch_img} alt />
                    </div>
                    <div className="blog-content">
                      <h3>{v.name}</h3>
                      <p>{v.description}</p>
                      <p>{v.address}</p>

                      <a href="#">Read More</a>
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

export default Branch;
