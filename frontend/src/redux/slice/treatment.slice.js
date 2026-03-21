import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  treatment: [],
  error: false,
};

export const getTreatment = createAsyncThunk(
  "treatment/getTreatment",
  async () => {
    const responce = await axios.get("http://localhost:3000/treatment/getTreatment");
    return responce.data.data;
  }
);

export const addTreatment = createAsyncThunk(
  "treatment/addTreatment",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("appointment_id", values.appointment_id);
      formData.append("disease", values.disease);
      formData.append("date", values.date);
      formData.append("prescription", values.prescription);
      formData.append("amount", values.amount);
      formData.append("treatment_img", values.treatment_img);

      const responce = await axios.post(
        "http://localhost:3000/treatment/addTreatment",
        formData
      );

      return responce.data.data;
    } catch (error) {}
  }
);

export const updateTreatment = createAsyncThunk(
  "treatment/updateTreatment",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("appointment_id", values.appointment_id);
      formData.append("disease", values.disease);
      formData.append("date", values.date);
      formData.append("prescription", values.prescription);
      formData.append("amount", values.amount);
      formData.append("treatment_img", values.treatment_img);

      const responce = await axios.put(
        `http://localhost:3000/treatment/updateTreatment/${values.id}`,
        formData
      );

      return responce.data.data;
    } catch (error) {}
  }
);

export const deleteTreatment = createAsyncThunk(
  "treatment/deleteTreatment",
  async (id) => {
    await axios.delete(`http://localhost:3000/treatment/deleteTreatment/${id}`);
    return id;
  }
);

export const treatmentSlice = createSlice({
  name: "treatment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTreatment.fulfilled, (state, action) => {
      state.treatment = action.payload;
    });
    builder.addCase(addTreatment.fulfilled, (state, action) => {
      state.treatment.push(action.payload);
    });
    builder.addCase(updateTreatment.fulfilled, (state, action) => {
      const index = state.treatment.findIndex((v) => v.id == action.payload.id);
      state.treatment[index] = action.payload;
    });
    builder.addCase(deleteTreatment.fulfilled, (state, action) => {
      const index = state.treatment.findIndex((v) => v.id === action.payload);
      state.treatment.splice(index, 1);
    });
  },
});

export default treatmentSlice.reducer;