import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  location: [],
  error: false,
};

export const getBranch = createAsyncThunk("branch/getBranch", async () => {
    console.log("fggfgfg");
    
  const responce = await axios.get("http://localhost:3000/branch/getBranch");
  console.log(responce.data.data);
});

export const branchSlice = createSlice({
  name: "branch",
  initialState: initialState,
  extraReducers: () => {},
});
