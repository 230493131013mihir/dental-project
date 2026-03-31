import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  appointment: [],
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


export const bookAppointment = createAsyncThunk(
  "appointment/bookAppointment",
  async (values) => {
    try {
      
      const responce = await axios.post(
        "http://localhost:3000/appointment/bookAppointment",
        {...values, user_id: localStorage.getItem("user_id")}
      );

      return responce.data.data;
    } catch (error) {}
  }
);

export const addTreatment = createAsyncThunk(
  "appointment/addTreatment",
  async (values) => {
    try {
      
      const responce = await axios.post(
        "http://localhost:3000/appointment/addTreatment",
        values
      );

      return responce.data.data;
    } catch (error) {
      console.log(error);
      
    }
  }
);


export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(bookAppointment.fulfilled, (state, action) => {
      state.appointment = action.payload;
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

export default appointmentSlice.reducer;