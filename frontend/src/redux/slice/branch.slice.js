import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  branch: [],
  error: false,
};

export const getBranch = createAsyncThunk("branch/getBranch", async () => {
    
    
  const responce = await axios.get("http://localhost:3000/branch/getBranch");
  console.log(responce.data.data);

  return responce.data.data;
});

export const branchSlice = createSlice({
  name: "branch",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBranch.fulfilled,(state, action) => {
      console.log(action.payload);
    
      state.branch = action.payload

    })
  },
})

export default branchSlice.reducer
