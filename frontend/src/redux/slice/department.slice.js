import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  location: [],
  error: false,
};

export const getDepartment = createAsyncThunk("department/getDepartment", async () => {
    console.log("fggfgfg");
    
  const responce = await axios.get("http://localhost:3000/department/getDepartment");
  console.log(responce.data.data);
});

export const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  extraReducers: () => {},
});
