// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import PeopleIcon from "@mui/icons-material/People";
// import EventIcon from "@mui/icons-material/Event";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import { useSelector } from "react-redux";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
// } from "recharts";

// const Dashboard = () => {
//   const patients = useSelector((state) => state.patient?.patient || []);
//   const appointments = useSelector(
//     (state) => state.appointment?.appointment || [],
//   );
//   const medicines = useSelector((state) => state.medicine?.medicine || []);

//   // ✅ Revenue
//   const totalRevenue = appointments.reduce(
//     (sum, item) => sum + (item.amount || 0),
//     0,
//   );

//   const medicineRevenue = medicines.reduce(
//     (sum, item) => sum + (item.price || 0),
//     0,
//   );

//   // ✅ Cards
//   const stats = [
//     {
//       title: "No of Patient",
//       value: patients.length,
//       icon: <PeopleIcon />,
//       color: "#1976d2",
//     },
//     {
//       title: "No of Appointment",
//       value: appointments.length,
//       icon: <EventIcon />,
//       color: "#2e7d32",
//     },
//     {
//       title: "Total Revenue",
//       value: `₹${totalRevenue}`,
//       icon: <CurrencyRupeeIcon />,
//       color: "#ed6c02",
//     },
//     {
//       title: "Total Medicines",
//       value: medicines.length,
//       icon: <LocalHospitalIcon />,
//       color: "#9c27b0",
//     },
//     {
//       title: "Medicines Revenue",
//       value: `₹${medicineRevenue}`,
//       icon: <CurrencyRupeeIcon />,
//       color: "#d32f2f",
//     },
//   ];

//   // ✅ Line chart
//   const chartData = appointments.reduce((acc, item) => {
//     if (!item.date) return acc;
//     const date = new Date(item.date).toLocaleDateString();

//     const found = acc.find((x) => x.name === date);
//     if (found) found.value += 1;
//     else acc.push({ name: date, value: 1 });

//     return acc;
//   }, []);

//   // ✅ Pie chart
//   const pieData = [
//     { name: "Patients", value: patients.length },
//     { name: "Appointments", value: appointments.length },
//     { name: "Medicines", value: medicines.length },
//   ];

//   const COLORS = ["#1976d2", "#2e7d32", "#ed6c02"];

//   return (
//     <div style={{ padding: "20px", minHeight: "100vh" }}>
//       <Typography variant="h5" style={{ marginBottom: "20px" }}>
//         Dashboard
//       </Typography>

//       {/* 🔥 CARDS */}
//       <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
//         {stats.map((item, index) => (
//           <div key={index} style={{ minWidth: "220px", flex: 1 }}>
//             <Card>
//               <CardContent>
                
//                 <Typography>{item.title}</Typography>
//                 <Typography variant="h6">{item.value}</Typography>
//                 <div style={{ color: item.color }}>{item.icon}</div>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>

//       {/* 📊 CHARTS IN SAME ROW */}
//       {/* 📊 LINE + PIE CHART */}
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           marginTop: "30px",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* ✅ LINE CHART (STATIC) */}
//         <div style={{ flex: 1, minWidth: "300px" }}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Appointments Trend</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart
//                   data={[
//                     { name: "Mon", value: 10 },
//                     { name: "Tue", value: 20 },
//                     { name: "Wed", value: 15 },
//                     { name: "Thu", value: 25 },
//                     { name: "Fri", value: 18 },
//                   ]}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line dataKey="value" stroke="#1976d2" strokeWidth={3} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>

//         {/* ✅ PIE CHART (DYNAMIC) */}
//         <div style={{ flex: 1, minWidth: "300px" }}>
//   <Card>
//     <CardContent>
//       <Typography variant="h6">Overview</Typography>

//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={[
//               { name: "Patients", value: 30 },
//               { name: "Appointments", value: 50 },
//               { name: "Medicines", value: 20 },
//             ]}
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             innerRadius={50}
//             dataKey="value"
//             label
//           >
//             <Cell fill="#1976d2" />
//             <Cell fill="#2e7d32" />
//             <Cell fill="#ed6c02" />
//           </Pie>

//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </CardContent>
//   </Card>
// </div>
//       </div>

//       {/* 📋 TABLES */}
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           marginTop: "30px",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* NEW APPOINTMENT */}
//       <div style={{ flex: 1 }}>
//   <Card>
//     <CardContent>
//       <Typography variant="h6" style={{ marginBottom: "10px" }}>
//         New Appointment
//       </Typography>

//       <table width="100%" style={{ borderCollapse: "collapse" }}>
//         <thead>
//           <tr style={{ background: "#f5f5f5" }}>
//             <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
//             <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td style={{ padding: "8px" }}>John Doe</td>
//             <td style={{ padding: "8px" }}>2026-04-10</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "8px" }}>Jane Smith</td>
//             <td style={{ padding: "8px" }}>2026-04-11</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "8px" }}>Mike Johnson</td>
//             <td style={{ padding: "8px" }}>2026-04-12</td>
//           </tr>
//         </tbody>
//       </table>
//     </CardContent>
//   </Card>
// </div>

//         {/* CURRENT APPOINTMENT */}
//       <div style={{ flex: 1 }}>
//   <Card>
//     <CardContent>
//       <Typography variant="h6" style={{ marginBottom: "10px" }}>
//         Current Appointment
//       </Typography>

//       <table width="100%" style={{ borderCollapse: "collapse" }}>
//         <thead>
//           <tr style={{ background: "#f5f5f5" }}>
//             <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
//             <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td style={{ padding: "8px" }}>Alex Brown</td>
//             <td style={{ padding: "8px", color: "green" }}>Completed</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "8px" }}>Emma Wilson</td>
//             <td style={{ padding: "8px", color: "orange" }}>Pending</td>
//           </tr>
//           <tr>
//             <td style={{ padding: "8px" }}>Chris Evans</td>
//             <td style={{ padding: "8px", color: "red" }}>Cancelled</td>
//           </tr>
//         </tbody>
//       </table>
//     </CardContent>
//   </Card>
// </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useSelector } from "react-redux";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const patients = useSelector((state) => state.patient?.patient || []);
  const appointments = useSelector(
    (state) => state.appointment?.appointment || []
  );
  const medicines = useSelector((state) => state.medicine?.medicine || []);

  const totalRevenue = appointments.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  const medicineRevenue = medicines.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  const stats = [
    { title: "Patients", value: patients.length, icon: <PeopleIcon />, color: "#1976d2" },
    { title: "Appointments", value: appointments.length, icon: <EventIcon />, color: "#2e7d32" },
    { title: "Revenue", value: `₹${totalRevenue}`, icon: <CurrencyRupeeIcon />, color: "#ed6c02" },
    { title: "Medicines", value: medicines.length, icon: <LocalHospitalIcon />, color: "#9c27b0" },
    { title: "Medicine Revenue", value: `₹${medicineRevenue}`, icon: <CurrencyRupeeIcon />, color: "#d32f2f" },
  ];

  const COLORS = ["#1976d2", "#2e7d32", "#ed6c02"];

  const chartData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 20 },
    { name: "Wed", value: 15 },
    { name: "Thu", value: 25 },
    { name: "Fri", value: 18 },
  ];

  const pieData = [
    { name: "Patients", value: 30 },
    { name: "Appointments", value: 50 },
    { name: "Medicines", value: 20 },
  ];

  const cardStyle = {
    borderRadius: "16px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
  };

  const hoverEffect = (e, enter) => {
    if (enter) {
      e.currentTarget.style.transform = "translateY(-10px)";
      e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.15)";
    } else {
      e.currentTarget.style.transform = "translateY(0px)";
      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)";
    }
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "#f4f6f8" }}>
      
      {/* HEADER */}
      <Typography variant="h5" style={{ fontWeight: 700, marginBottom: "20px" }}>
        Dashboard Overview
      </Typography>

      {/* STATS CARDS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {stats.map((item, i) => (
          <div key={i} style={{ minWidth: "200px", flex: 1 }}>
            <Card
              style={cardStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
            >
              <CardContent>
                <Typography style={{ fontSize: "14px", color: "#666" }}>
                  {item.title}
                </Typography>
                <Typography variant="h6" style={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
                <div style={{ color: item.color, marginTop: "10px" }}>
                  {item.icon}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
        
        {/* LINE CHART */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <Card
            style={cardStyle}
            onMouseEnter={(e) => hoverEffect(e, true)}
            onMouseLeave={(e) => hoverEffect(e, false)}
          >
            <CardContent>
              <Typography variant="h6">Appointments Trend</Typography>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* PIE CHART */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <Card
            style={cardStyle}
            onMouseEnter={(e) => hoverEffect(e, true)}
            onMouseLeave={(e) => hoverEffect(e, false)}
          >
            <CardContent>
              <Typography variant="h6">Overview</Typography>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} innerRadius={60} dataKey="value">
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TABLES */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>

        {/* NEW APPOINTMENT */}
        <div style={{ flex: 1 }}>
          <Card
            style={cardStyle}
            onMouseEnter={(e) => hoverEffect(e, true)}
            onMouseLeave={(e) => hoverEffect(e, false)}
          >
            <CardContent>
              <Typography variant="h6">New Appointment</Typography>

              <table width="100%" style={{ marginTop: "10px" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th align="left">Name</th>
                    <th align="left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {["John Doe", "Jane Smith", "Mike Johnson"].map((n, i) => (
                    <tr
                      key={i}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#eef2ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      style={{ transition: "0.2s" }}
                    >
                      <td>{n}</td>
                      <td>2026-04-1{i + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* CURRENT APPOINTMENT */}
        <div style={{ flex: 1 }}>
          <Card
            style={cardStyle}
            onMouseEnter={(e) => hoverEffect(e, true)}
            onMouseLeave={(e) => hoverEffect(e, false)}
          >
            <CardContent>
              <Typography variant="h6">Current Appointment</Typography>

              <table width="100%" style={{ marginTop: "10px" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th align="left">Name</th>
                    <th align="left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Alex Brown", status: "Completed", color: "green" },
                    { name: "Emma Wilson", status: "Pending", color: "orange" },
                    { name: "Chris Evans", status: "Cancelled", color: "red" },
                  ].map((n, i) => (
                    <tr
                      key={i}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#eef2ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      style={{ transition: "0.2s" }}
                    >
                      <td>{n.name}</td>
                      <td style={{ color: n.color }}>{n.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;