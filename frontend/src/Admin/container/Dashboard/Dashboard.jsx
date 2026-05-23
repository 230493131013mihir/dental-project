import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    {
      title: "Paid Payments",
      value: dashboard?.dashboard?.totalPayments || 0,
      icon: <PaymentsIcon />,
      color: "#00897b",
    },
    {
      title: "Payment Revenue",
      value: `₹${dashboard?.dashboard?.paymentRevenue || 0}`,
      icon: <CurrencyRupeeIcon />,
      color: "#5e35b1",
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

  const formatAppointmentDate = (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value || "-";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getAppointmentTimeValue = (item) => {
    const dateValue = new Date(item.date || "").getTime();
    const [hours = 0, minutes = 0] = String(item.starttime || "00:00")
      .split(":")
      .map(Number);

    return (dateValue || 0) + (hours * 60 + minutes) * 60000;
  };

  const rows =
    dashboard?.appointments
      ?.slice()
      .sort((a, b) => {
        return getAppointmentTimeValue(b) - getAppointmentTimeValue(a);
      })
      .map((item, index) => ({
        id: item.id || index + 1,
        sequence: index + 1,
        patient_name: item.patient_name,
        phone: item.phone,
        date: formatAppointmentDate(item.date),
        branch: item.branch_name,
        department: item.department_name,
        time: `${item.starttime} - ${item.endtime}`,
      })) || [];

  const columns = [
    { field: "sequence", headerName: "#", width: 70 },
    { field: "patient_name", headerName: "Patient", flex: 1.15, minWidth: 180 },
    { field: "phone", headerName: "Phone No", flex: 0.9, minWidth: 130 },
    { field: "date", headerName: "Date", flex: 0.9, minWidth: 130 },
    { field: "branch", headerName: "Branch", flex: 1, minWidth: 140 },
    { field: "department", headerName: "Department", flex: 1.25, minWidth: 190 },
    { field: "time", headerName: "Time", flex: 0.9, minWidth: 130 },
  ];

  const pieData = dashboard?.branchRevenue?.map(item => ({
  name: item.branch_name,
  value: Number(item.total_amount) // convert to number
})) || [];

  const quickActions = [
    { label: "Appointments", to: "/admin/appointment" },
    { label: "Medical Payments", to: "/admin/medical" },
    { label: "Patients", to: "/admin/patient" },
    { label: "Users", to: "/admin/user" },
  ];

  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "#f4f6f8" }}>
      {/* HEADER */}
      <Typography
        variant="h5"
        style={{ fontWeight: 700, marginBottom: "20px" }}
      >
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 3 }}>
        {quickActions.map((action) => (
          <Button
            key={action.to}
            variant="outlined"
            onClick={() => navigate(action.to)}
          >
            {action.label}
          </Button>
        ))}
      </Box>

      {/* STATS CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "20px" }}>
        {stats.map((item, i) => (
          <div key={i}>
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
        <div style={{ flex: 1, minWidth: "320px" }}>
          <Card
            style={{
              borderRadius: "18px",
              border: "1px solid #e5edf7",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "#0f172a" }}
                  >
                    New Appointments
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                    Latest appointments shown first in proper sequence
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.7,
                    borderRadius: "999px",
                    background: "#e0f2fe",
                    color: "#0369a1",
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                >
                  {rows.length} total
                </Box>
              </Box>

              <div style={{ height: 350, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  disableRowSelectionOnClick
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    color: "#1e293b",
                    "& .MuiDataGrid-columnHeaders": {
                      background: "#f8fafc",
                      borderBottom: "1px solid #dbe7f3",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: 800,
                      color: "#0f172a",
                    },
                    "& .MuiDataGrid-row": {
                      transition: "background 0.2s ease",
                    },
                    "& .MuiDataGrid-row:hover": {
                      background: "#f0f9ff",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #edf2f7",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      background: "#ffffff",
                      borderTop: "1px solid #e2e8f0",
                    },
                  }}
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
