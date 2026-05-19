import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonial } from "../../redux/slice/department.slice";
import { NavLink } from "react-router-dom";
import { getBranch } from "../../redux/slice/branch.slice";

function Testimonial(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestimonial());
    dispatch(getBranch());
  }, []);

  const departmentData = useSelector((state) => state.department);
  const branch = useSelector((state) => state.branch);

  console.log(departmentData.department);

  return (
    <main>
       {/*Testimonial*/}
      <section className="testimonial" id="tsti">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="heading">
                <span className="badge">
                  <i>●</i> Testimonials
                </span>
                <h2>Patient Testimonials Healthier Happier Smiles</h2>
                <p>
                  Discover real patient testimonials highlighting our expert
                  medical care and personalized treatments, and compassionate
                  support.
                </p>
              </div>
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {reviews.testimonal?.map((v) => (
                  // <SwiperSlide>
                  //   <div className="test-slide">
                  //     <div className="rating">
                  //       {[...Array(v.rating).keys()].map((v1) => (
                  //           <div>
                  //             <i className="fa-solid fa-star" />
                  //           </div>
                  //         ))}
                  //     </div>
                  //     <p className="test-data">{v.description}</p>
                  //     <div className="person">
                  //       <div className="call-us">
                  //         <div className="call-text">
                  //           <p> -
                  //             {
                  //               users.user?.find(v1 => v1.id === v.user_id)?.name
                  //             }
                  //           </p>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </SwiperSlide>
                  // <SwiperSlide>
                  //   <div
                  //     style={{
                  //       width: "100%",
                  //       padding: "25px",
                  //       borderRadius: "18px",
                  //       background: "linear-gradient(135deg, #ffffff, #f8f9fb)",
                  //       boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  //       fontFamily: "sans-serif",
                  //     }}
                  //   >
                  //     {/* ⭐ Rating */}
                  //     <div
                  //       style={{
                  //         display: "flex",
                  //         gap: "6px",
                  //         marginBottom: "15px",
                  //       }}
                  //     >
                  //       {[...Array(5)].map((_, i) => (
                  //         <i
                  //           key={i}
                  //           className={`fa-star ${
                  //             i < v.rating ? "fa-solid" : "fa-regular"
                  //           }`}
                  //           style={{
                  //             color: i < v.rating ? "#f5b301" : "#ddd",
                  //             fontSize: "18px",
                  //           }}
                  //         />
                  //       ))}
                  //     </div>

                  //     {/* 📝 Description */}
                  //     <p
                  //       style={{
                  //         fontSize: "15px",
                  //         color: "#444",
                  //         lineHeight: "1.7",
                  //         marginBottom: "20px",
                  //       }}
                  //     >
                  //       {v.description}
                  //     </p>

                  //     {/* 👤 User */}
                  //     <div
                  //       style={{
                  //         display: "flex",
                  //         alignItems: "center",
                  //         borderTop: "1px solid #eee",
                  //         paddingTop: "12px",
                  //       }}
                  //     >
                  //       <div
                  //         style={{
                  //           width: "40px",
                  //           height: "40px",
                  //           borderRadius: "50%",
                  //           background: "#e0e0e0",
                  //           marginRight: "10px",
                  //         }}
                  //       ></div>

                  //       <p
                  //         style={{
                  //           fontSize: "14px",
                  //           fontWeight: "600",
                  //           color: "#222",
                  //           margin: 0,
                  //         }}
                  //       >
                  //         {users.user?.find((v1) => v1.id === v.user_id)?.name}
                  //       </p>
                  //     </div>
                  //   </div>
                  // </SwiperSlide>
                  <SwiperSlide>
                    <div
                      style={{
                        width: "100%",
                        padding: "25px",
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #ffffff, #f8f9fb)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {/* ⭐ Rating */}
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          marginBottom: "15px",
                        }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fa-star ${
                              i < v.rating ? "fa-solid" : "fa-regular"
                            }`}
                            style={{
                              color: i < v.rating ? "#f5b301" : "#ddd",
                              fontSize: "18px",
                            }}
                          />
                        ))}
                      </div>

                      {/* 📝 Description */}
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#444",
                          lineHeight: "1.7",
                          marginBottom: "20px",
                        }}
                      >
                        {v.description}
                      </p>

                      {/* 👤 User */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderTop: "1px solid #eee",
                          paddingTop: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #f5b301, #ffd95c)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          }}
                        >
                          <i
                            className="fa-solid fa-user"
                            style={{ color: "#fff", fontSize: "16px" }}
                          />
                        </div>

                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#222",
                            margin: 0,
                          }}
                        >
                          {users.user?.find((v1) => v1.id === v.user_id)?.name}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="col-12 col-lg-6">
              <div className="test-image">
                <img src="images/doctormeet.jpg" alt="Testimonial Image" />
              </div>
            </div>
          </div>
          {auth?.patient ? (
            <div className="review-btn" style={{ marginTop: "20px" }}>
              <a href="javascript:void(0);" className="btn">
                <NavLink to="/addReview">Add Review</NavLink>
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default Testimonial;
