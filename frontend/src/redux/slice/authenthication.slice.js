import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  patient: null,
  error: false,
};

export const register = createAsyncThunk("branch/register", async (data) => {
  try {
    const responce = await axios.post(
      "http://localhost:3000/patient/RegisterDetails",
      data,
    );
    console.log(responce.data.data);
    return responce.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk("branch/login", async (data) => {
  try {
    const responce = await axios.post(
      "http://localhost:3000/patient/login",
      data,
    );
    console.log(responce.data.data);

    if (!responce.data.data) {
      alert(responce.data.message);
    }
    return responce.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const logout = createAsyncThunk("branch/logout", async (data) => {
  try {
    return null;
  } catch (error) {
    console.log(error);
  }
});

export const authenthicationSlice = createSlice({
  name: "authencatication",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      console.log(action.payload);
      state.patient = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      state.patient = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log(action.payload);
      state.patient = action.payload;
    });
  },
});

export default authenthicationSlice.reducer;
