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
      data,
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);

export const addMedical = createAsyncThunk(
  "medical/addMedical",
  async (values) => {
    try {
      console.log(values);

      // const formData = new FormData();

      // formData.append("name", values.name);
      // formData.append("phone", values.phone);
      // formData.append("date", values.date);
      // formData.append("time", values.time);

      // formData.append("medicine_id", values.medicine_id);
      // formData.append("medicine_quantity", values.medicine_quantity);

      const responce = await axios.post(
        "http://localhost:3000/medical/addMedical",
        values,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const updateMedical = createAsyncThunk(
  "medical/updateMedical",
  async (values) => {
    try {
      // console.log(values);

      // const formData = new FormData();

      // formData.append("name", values.name);
      // formData.append("phone", values.phone);
      // formData.append("date", values.date);
      // formData.append("time", values.time);

      // formData.append("medicine_id", values.medicine_id);
      // formData.append("medicine_quantity", values.medicine_quantity);

      const responce = await axios.put(
        `http://localhost:3000/medical/updateMedical/${values.id}`,
        values,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const medicalSlice = createSlice({
  name: "medical",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMedical.fulfilled, (state, action) => {
      state.medical = action.payload;
    });
    builder.addCase(addMedical.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.medical.push(action.payload);
    });
    builder.addCase(updateMedical.fulfilled, (state, action) => {
      const index = state.medical.findIndex((v) => v.id == action.payload.id);

      state.medical[index] = action.payload;
    });
  },
});

export default medicalSlice.reducer;
