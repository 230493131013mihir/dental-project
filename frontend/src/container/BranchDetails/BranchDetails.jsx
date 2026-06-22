import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBranch } from "../../redux/slice/branch.slice";
import { API_BASE_URL } from "../../config/api";

const getImageUrl = (path) => {
  if (!path) return "/images/place.jpg";
  if (path.startsWith("http") || path.startsWith("images/")) return path;
  return `${API_BASE_URL}/${path}`;
};

function BranchDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBranch());
  }, [dispatch]);

  const branchData = useSelector((state) => state.branch);
  const branch = branchData.branch.find((item) => item.id == id);

  if (!branch) {
    return (
      <main className="directory-page">
        <section className="directory-section">
          <div className="container">
            <div className="empty-state">
              <i className="fa-solid fa-location-dot" />
              <h2>Branch not found</h2>
              <p>This branch may still be loading or it is not available.</p>
              <NavLink to="/branch" className="btn">Back to Branches</NavLink>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="directory-page">
      <section className="branch-detail">
        <div className="container">
          <div className="branch-detail-card reveal-up">
            <img src={getImageUrl(branch.branch_img)} alt={branch.name} />
            <div className="branch-detail-content">
              <span className="badge"><i className="fa-solid fa-clinic-medical" /> Branch Details</span>
              <h1>{branch.name}</h1>
              <p>{branch.description}</p>

              <div className="branch-info-list">
                <div><i className="fa-solid fa-envelope" /> <span>{branch.email || "Email not added"}</span></div>
                <div><i className="fa-solid fa-phone" /> <span>{branch.mobile_no || "Phone not added"}</span></div>
                <div><i className="fa-solid fa-map-location-dot" /> <span>{branch.address}</span></div>
              </div>

              <div className="branch-actions">
                {branch.mobile_no ? <a href={`tel:${branch.mobile_no}`} className="btn">Contact Branch</a> : null}
                <NavLink to="/appointment" className="btn branch-secondary">Book Appointment</NavLink>
                <NavLink to="/branch" className="branch-back">Back to Branches</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BranchDetails;
