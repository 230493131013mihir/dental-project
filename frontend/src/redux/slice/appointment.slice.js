import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  appointment: [],
  myAppointment: [],
  error: false,
};

export const getAppointment = createAsyncThunk(
  "appointment/getAppointment",
  async () => {
    const responce = await axios.get(
      "http://localhost:3000/appointment/getAppointment",
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);

export const getMyAppointment = createAsyncThunk(
  "appointment/getMyAppointment",
  async () => {
    const user_id = localStorage.getItem("user_id");

    const responce = await axios.get(
      "http://localhost:3000/appointment/getMyAppointment/" + user_id,
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);

export const bookAppointment = createAsyncThunk(
  "appointment/bookAppointment",
  async (values) => {
    try {
      const responce = await axios.post(
        "http://localhost:3000/appointment/bookAppointment",
        { ...values, user_id: localStorage.getItem("user_id") },
      );

      console.log("fffffasd0", responce.data.data);
      

      return responce.data.data;
    } catch (error) {}
  },
);

export const addTreatment = createAsyncThunk(
  "appointment/addTreatment",
  async (values) => {
    try {
      const responce = await axios.post(
        "http://localhost:3000/appointment/addTreatment",
        { ...values, actor_user_id: localStorage.getItem("user_id") },
      );

      return responce.data.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearMyAppointment: (state) => {
      state.myAppointment = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bookAppointment.fulfilled, (state, action) => {
      if (action.payload) {
        state.appointment.push(action.payload);
        state.myAppointment.push(action.payload);
      }
    });
    builder.addCase(getMyAppointment.fulfilled, (state, action) => {
      state.myAppointment = action.payload;
    });
    builder.addCase(getAppointment.fulfilled, (state, action) => {
      console.log(action.payload);
      state.appointment = action.payload;
    });
    builder.addCase(addTreatment.fulfilled, (state, action) => {
      console.log(action.payload);
      state.appointment = action.payload;
    });
  },
});

export const { clearMyAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
