import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { object, string } from "yup";
import { login } from "../../redux/slice/authenthication.slice";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../redux/slice/testimonial.slice";

function Review(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  
  
  let userschema = object({
    rating: string().required("please enter your rating"),
    description: string().required("Please Select description id"),
  });


  
  

  const formik = useFormik({
    initialValues: {
      description: "",
      rating: "",
    },

    validationSchema: userschema,

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const user_id = localStorage.getItem("user_id");

      const res = await dispatch(addReview({...values, user_id: user_id}));

      console.log(res);

      if (res.payload) {
        navigate("/");
      }

      resetForm();
    },
  });
  
 
  

  console.log(formik.errors, formik.touched);
  return (
    <main>
      <section>
        <div className="container">
<div
  className="row"
  style={{
    justifyContent: "space-between",
    marginTop: "70px",
    alignItems: "center",
  }}
>
  {/* IMAGE */}
  <div className="col-5">
    <img
      src="images/review.jpg"
      alt=""
      style={{
        width: "100%",
        height: "520px",
        objectFit: "cover",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    />
  </div>

  {/* FORM */}
  <div className="col-6">
    <div
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        padding: "40px",
        borderRadius: "25px",
        boxShadow: "0 15px 40px rgba(0,150,136,0.15)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <h3
          style={{
            marginBottom: "25px",
            color: "#00695c",
            fontWeight: "600",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Patient Review
        </h3>

        <div className="row">
          {/* RATING */}
          <div className="col-12" style={{ marginBottom: "20px" }}>
            <select
              name="rating"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rating}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #b2dfdb",
                outline: "none",
                fontSize: "14px",
                background: "#fff",
              }}
            >
              <option value="">--Select Rating--</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>

            {formik.errors.rating && formik.touched.rating && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.rating}
              </span>
            )}
          </div>

          {/* TEXTAREA */}
          <div className="col-12" style={{ marginBottom: "20px" }}>
            <textarea
              rows={5}
              placeholder="Write your experience..."
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #b2dfdb",
                outline: "none",
                fontSize: "14px",
                resize: "none",
              }}
            ></textarea>

            {formik.errors.description &&
              formik.touched.description && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.description}
                </span>
              )}
          </div>

          {/* BUTTON */}
          <div className="col-12" style={{ textAlign: "center" }}>
            <input
              type="submit"
              value="Submit Review"
              style={{
                padding: "12px 35px",
                borderRadius: "30px",
                border: "none",
                background:
                  "linear-gradient(135deg, #009688, #26a69a)",
                color: "#fff",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 8px 20px rgba(0,150,136,0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
      </section>
    </main>
  );
}

export default Review;
