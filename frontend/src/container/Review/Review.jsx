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
            style={{ justifyContent: "space-between", marginTop: "50px" }}
          >
            <div className="col-5">
              <img
                src="images/review.jpg"
                alt=""
                width={"100%"}
                height={"500px"}
              />
            </div>
            <div className="col-6">
              <div className="appointment">
                <form onSubmit={formik.handleSubmit} id="login-form">
                  <h3>Review</h3>
                  <div className="row">
                    <div className="col-12">
                      <select
                        name="rating"
                        id=""
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rating}
                      >
                        <option value="">--Select Rating--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      {formik.errors.rating && formik.touched.rating ? (
                        <span
                          className="error"
                          style={{ marginBottom: "20px" }}
                        >
                          {formik.errors.rating}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12">
                      <textarea
                        class="form-control"
                        rows={5}
                        style={{ width: "100%" }}
                        type="description"
                        placeholder="Please enter your reviews"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      ></textarea>
                      {formik.errors.description &&
                      formik.touched.description ? (
                        <span
                          className="error"
                          style={{ marginBottom: "20px" }}
                        >
                          {formik.errors.description}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        defaultValue="Add Review"
                        className="btn"
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
