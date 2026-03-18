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

export const addBranch = createAsyncThunk(
  "branch/addBranch",
  async (values) => {
    try {
      const responce = await axios.post(
        "http://localhost:3000/branch/addBranch",
        values,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteBranch = createAsyncThunk(
  "branch/deleteBranch",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/branch/deleteBranch/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const branchSlice = createSlice({
  name: "branch",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBranch.fulfilled, (state, action) => {
      console.log(action.payload);
      state.branch = action.payload;
    });
    builder.addCase(addBranch.fulfilled, (state, action) => {
      state.branch.push = action.payload;
    });
    builder.addCase(deleteBranch.fulfilled, (state, action) => {
      const index = state.branch.findIndex((v) => v.id === action.payload);

      state.branch.splice(index, 1);
    });
  },
});

export default branchSlice.reducer;
