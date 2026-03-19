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

  return responce.data.data;
});

export const addExpence = createAsyncThunk(
  "expence/addExpence",
  async (values) => {
    try {
      const responce = await axios.post(
        "http://localhost:3000/expence/addExpence",
        values,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteExpence = createAsyncThunk(
  "expence/deleteExpence",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/expence/deleteExpence/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const expenceSlice = createSlice({
  name: "expence",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getExpence.fulfilled, (state, action) => {
          console.log(action.payload);
    
          state.expence = action.payload;
        });
         builder.addCase(addExpence.fulfilled, (state, action) => {
              state.expence.push(action.payload);
            });
            builder.addCase(deleteExpence.fulfilled, (state, action) => {
              const index = state.expence.findIndex((v) => v.id === action.payload);
        
              state.expence.splice(index, 1);
            });
  },
});

export default expenceSlice.reducer;
