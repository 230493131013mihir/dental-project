import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBranch } from "../../redux/slice/branch.slice";
import { API_BASE_URL } from "../../config/api";

const getImageUrl = (path) => {
  if (!path) return "images/place.jpg";
  if (path.startsWith("http") || path.startsWith("images/")) return path;
  return `${API_BASE_URL}/${path}`;
};

function Branch() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranch());
  }, [dispatch]);

  const branchData = useSelector((state) => state.branch);
  const branches = useMemo(
    () => (Array.isArray(branchData.branch) ? branchData.branch : []),
    [branchData.branch],
  );

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <div className="container">
          <span className="badge"><i className="fa-solid fa-location-dot" /> Our Branches</span>
          <h1>Your registered clinic locations</h1>
          <p>Only branches added in your backend are shown here. No fake city or dummy location data is displayed.</p>
        </div>
      </section>

      <section className="directory-section">
        <div className="container">
          {branches.length ? (
            <div className="directory-grid">
              {branches.map((branch, index) => (
                <NavLink to={`/branch_details/${branch.id}`} className="directory-card reveal-up" style={{ animationDelay: `${index * 0.08}s` }} key={branch.id}>
                  <img src={getImageUrl(branch.branch_img)} alt={branch.name} />
                  <div>
                    <span>{branch.city || branch.state || "Dental Branch"}</span>
                    <h3>{branch.name}</h3>
                    <p>{branch.description}</p>
                    <strong><i className="fa-solid fa-location-dot" /> {branch.address}</strong>
                    <em>View Branch</em>
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-clinic-medical" />
              <h2>No branches found</h2>
              <p>Add branches from the admin panel and they will appear here automatically.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Branch;
