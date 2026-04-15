import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dashboard: {},
  trend: [],
  appointments: [],
  branchRevenue: []
};

// DASHBOARD
export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async () => {
    const res = await axios.get("http://localhost:3000/dashboard/dashboard");
    console.log("API dashboard", res.data);
    return res.data.data;
  }
);

// TREND
export const fetchTrend = createAsyncThunk(
  "dashboard/fetchTrend",
  async () => {
    const res = await axios.get("http://localhost:3000/dashboard/trend");
    console.log("API trend", res.data);
    return res.data.data;
  }
);

// APPOINTMENTS
export const fetchAppointments = createAsyncThunk(
  "dashboard/fetchAppointments",
  async () => {
    const res = await axios.get("http://localhost:3000/dashboard/appointments");
    console.log("API appointments", res.data);
    return res.data.data;
  }
);

export const branchWiseRevenue = createAsyncThunk(
  "dashboard/branchWiseRevenue",
  async () => {
    const res = await axios.get("http://localhost:3000/dashboard/branchWiseRevenue");
    console.log("API appointments", res.data);
    return res.data.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      state.dashboard = action.payload || {};
    });

    builder.addCase(fetchTrend.fulfilled, (state, action) => {
      state.trend = action.payload || [];
    });

    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload || [];
    });

    builder.addCase(branchWiseRevenue.fulfilled, (state, action) => {
      state.branchRevenue = action.payload || [];
    });
  },
});

export default dashboardSlice.reducer;