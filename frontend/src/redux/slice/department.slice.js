import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  department: [],
  error: false,
};

export const getDepartment = createAsyncThunk(
  "department/getDepartment",
  async () => {
    const responce = await axios.get(
      "http://localhost:3000/department/getDepartment",
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);

export const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getDepartment.fulfilled, (state, action) => {
      console.log(action.payload);

      state.department = action.payload;
    });
  },
});

export default departmentSlice.reducer;
