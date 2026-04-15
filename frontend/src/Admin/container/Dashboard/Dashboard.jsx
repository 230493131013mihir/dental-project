import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

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
import {
  branchWiseRevenue,
  fetchAppointments,
  fetchDashboard,
  fetchTrend,
} from "../../../redux/slice/dashboard.slice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchAppointments());
    dispatch(fetchTrend());
    dispatch(branchWiseRevenue())
  }, []);

  const dashboard = useSelector((state) => state.dashboard);
  const patients = useSelector((state) => state.patient?.patient || []);
  const appointments = useSelector(
    (state) => state.appointment?.appointment || [],
  );
  const medicines = useSelector((state) => state.medicine?.medicine || []);

  const totalRevenue = appointments.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  const medicineRevenue = medicines.reduce(
    (sum, item) => sum + (item.price || 0),
    0,
  );
  const newAppointments = dashboard?.dashboard?.newAppointments || [];
  const currentAppointments = dashboard?.dashboard?.currentAppointments || [];

  const stats = [
    {
      title: "Patients",
      value: dashboard?.dashboard?.totalPatient,
      icon: <PeopleIcon />,
      color: "#1976d2",
    },
    {
      title: "Appointments",
      value: dashboard?.dashboard?.totalAppointment,
      icon: <EventIcon />,
      color: "#2e7d32",
    },
    {
      title: "Total Revenue",
      value: `₹${dashboard?.dashboard?.totalRevenue}`,
      icon: <CurrencyRupeeIcon />,
      color: "#ed6c02",
    },
    {
      title: "Medicines",
      value: dashboard?.dashboard?.totalMedicine,
      icon: <LocalHospitalIcon />,
      color: "#9c27b0",
    },
    {
      title: "Medicine Revenue",
      value: `₹${dashboard?.dashboard?.medicineRevenue}`,
      icon: <CurrencyRupeeIcon />,
      color: "#d32f2f",
    },
  ];

  const COLORS = ["#1976d2", "#2e7d32", "#ed6c02"];

  const chartData = [
    { name: "JAN", value: 10 },
    { name: "FEB", value: 20 },
    { name: "MAR", value: 15 },
    { name: "APR", value: 25 },
    { name: "MAY", value: 18 },
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

  console.log(dashboard);

  const rows =
    dashboard?.appointments?.map((item, index) => ({
      id: index + 1,
      patient_name: item.patient_name,
      phone: item.phone,
      date: item.date,
      branch: item.branch_name,
      department: item.department_name,
      time: `${item.starttime} - ${item.endtime}`,
    })) || [];

  const columns = [
    { field: "patient_name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone No", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "branch", headerName: "Branch", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
  ];

  const pieData = dashboard?.branchRevenue?.map(item => ({
  name: item.branch_name,
  value: Number(item.total_amount) // convert to number
}));

  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "#f4f6f8" }}>
      {/* HEADER */}
      <Typography
        variant="h5"
        style={{ fontWeight: 700, marginBottom: "20px" }}
      >
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
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
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
                <LineChart data={dashboard.trend}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1976d2"
                    strokeWidth={3}
                  />
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
              <Typography variant="h6">Branch wise Revenue</Typography>

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={pieData}
      cx="50%"
      cy="50%"
      outerRadius={100}
      innerRadius={60}
      dataKey="value"
    >
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
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* NEW APPOINTMENT */}
        <div style={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                New Appointment
              </Typography>

              <div style={{ height: 350, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5} // ✅ 5 rows per page
                  rowsPerPageOptions={[5]} // ✅ only show 5 option
                  pagination
                />
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
