import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  expence: [],
  error: false,
};

export const getExpence = createAsyncThunk("expence/getExpence", async () => {

    
  const responce = await axios.get("http://localhost:3000/expence/getExpence");
  console.log(responce.data.data);
});

export const expenceSlice = createSlice({
  name: "expence",
  initialState: initialState,
  extraReducers: () => {},
});
