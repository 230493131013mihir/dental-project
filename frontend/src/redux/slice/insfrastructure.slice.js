import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  insfrastructure: [],
  error: false,
};

export const getInsfrastructure = createAsyncThunk(
  "insfrastructure/getInsfrastructure",
  async () => {
    const responce = await axios.get(
      "http://localhost:3000/insfrastructure/getInsfrastructure",
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);
export const addDepartment = createAsyncThunk(
  "department/addDepartment",
  async (values) => {
    try {
      const responce = await axios.post(
        "http://localhost:3000/department/addDepartment",
        values,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/department/deleteDepartment/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const insfrastructureSlice = createSlice({
  name: "insfrastructure",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getInsfrastructure.fulfilled, (state, action) => {
      console.log(action.payload);

      state.insfrastructure = action.payload;
    });
     builder.addCase(addInsfrastructure.fulfilled, (state, action) => {
          state.insfrastructure.push = action.payload;
        });
        builder.addCase(deleteInsfrastructure.fulfilled, (state, action) => {
          const index = state.insfrastructure.findIndex((v) => v.id === action.payload);
    
          state.insfrastructure.splice(index, 1);
        });
  },
});

export default insfrastructureSlice.reducer;
