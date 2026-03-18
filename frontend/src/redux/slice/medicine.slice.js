import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  medicine: [],
  error: false,
};

export const getMedicine = createAsyncThunk("medicine/getMedicine", async () => {

    
  const responce = await axios.get("http://localhost:3000/medicine/getMedicine");
  console.log(responce.data.data);

  return responce.data.data;
});

export const addMedicine = createAsyncThunk(
  "medicine/addMedicine",
  async (values) => {
    try {
      const responce = await axios.post(
        "http://localhost:3000/medicine/addMedicine",
        values,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteMedicine = createAsyncThunk(
  "medicine/deleteMedicine",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/medicine/deleteMedicine/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const medicineSlice = createSlice({
  name: "medicine",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getMedicine.fulfilled, (state, action) => {
          console.log(action.payload);
    
          state.medicine = action.payload;
        });
         builder.addCase(addMedicine.fulfilled, (state, action) => {
              state.medicine.push = action.payload;
            });
            builder.addCase(deleteMedicine.fulfilled, (state, action) => {
              const index = state.medicine.findIndex((v) => v.id === action.payload);
        
              state.medicine.splice(index, 1);
            });
  },
});

export default medicineSlice.reducer;
