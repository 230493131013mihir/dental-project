// import React from 'react';

// function RegisterDetails(props) {
//     return (
//  <div className="container d-flex justify-content-center align-items-center vh-100" style={{
//     background: "linear-gradient(to right, #4facfe, #00f2fe)",
//     minHeight: "100vh",
//   }}

// >
//   <div className="card register-card shadow-lg p-4 bg-white" style={{     width: "100%", maxWidth: "420px", borderRadius: "15px", }}>
//     <h3 className="text-center mb-4">📝 Register</h3>
//     <form>
//       <div className="mb-3">
//         <label>Name</label>
//         <input type="text" className="form-control" placeholder="Enter your name" />
//       </div>
//       <div className="mb-3">
//         <label>Email</label>
//         <input type="email" className="form-control" placeholder="Enter your email" />
//       </div>
//       <div className="mb-3">
//         <label>Mobile</label>
//         <input type="text" className="form-control" placeholder="Enter your mobile" />
//       </div>
//       <div className="mb-3">
//         <label>Password</label>
//         <input type="password" className="form-control" placeholder="Create password" />
//       </div>
//       <button className="btn btn-success w-100">Register</button>
//     </form>
//     <p className="text-center mt-3">
//       Already have an account?
//       <a href="login.html">Login</a>
//     </p>
//   </div>
// </div>

//     );
// }

// export default RegisterDetails;

import React from "react";

function RegisterDetails(props) {
  return (
    <main>
      <section>
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between", marginTop: '50px' }}>
            <div className="col-5">
                <img src="images/register.webp" alt="" width={"100%"} height={"500px"} />
            </div>
            <div className="col-6">
              <div className="appointment">
                <form>
                  <h3>Register</h3>
                  <div className="row">
                    <div className="col-12">
                      <input type="text" placeholder="Patient Name" required />
                    </div>
                    <div className="col-12">
                      <input type="email" placeholder="Patient Email" required />
                    </div>
                    <div className="col-12">
                      <input type="password" placeholder="Patient Password" required />
                    </div>
                    <div className="col-12">
                      <input type="tel" placeholder="Phone Number" required />
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        defaultValue="Appointment"
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

export default RegisterDetails; 
