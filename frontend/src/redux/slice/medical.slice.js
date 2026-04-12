import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  medical: [],
  error: false,
};

export const getMedical = createAsyncThunk(
  "medical/getMedical",
  async (data) => {
    const responce = await axios.get(
      "http://localhost:3000/medical/getMedical",
      data
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);


export const medicalSlice = createSlice({
  name: "medical",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMedical.fulfilled, (state, action) => {
      state.medical = action.payload;
    });
   
  },
});

export default medicalSlice.reducer;