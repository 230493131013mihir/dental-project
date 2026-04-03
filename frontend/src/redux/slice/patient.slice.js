import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  patient: [],
  error: false,
};

export const getPatients = createAsyncThunk(
  "patient/getPatient",
  async (data) => {
    try {
      const responce = await axios.get(
        "http://localhost:3000/patient/getPatient",
        data,
      );
      console.log(responce.data.data);
      return responce.data.data;
    } catch (error) {
      console.log(error);
    }
  },
);

//add
export const addPatients = createAsyncThunk(
  "patient/addPatient",
  async (values) => {
    const responce = await axios.post(
      "http://localhost:3000/patient/addPatient",
      values,
    );

    console.log(responce);

    return responce.data.data;
  },
);

// UPDATE
export const updatePatient = createAsyncThunk(
  "blog/updatePatient",
  async (values) => {


    const res = await axios.put(
      `http://localhost:3000/patient/updatePatient/${values.id}`,
      values,
    );

    return res.data.data;
  },
);

// DELETE
export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (id) => {
    await axios.delete(`http://localhost:3000/patient/deletePatient/${id}`);
    return id;
  },
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPatients.fulfilled, (state, action) => {
      console.log(action.payload);
      state.patient = action.payload;
    });
    builder.addCase(addPatients.fulfilled, (state, action) => {
      state.patient.push(action.payload);
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      const index = state.patient.findIndex((v) => v.id == action.payload.id);

      console.log("iiii", index, action.payload);

      state.patient[index] = action.payload;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      const index = state.patient.findIndex((v) => v.id === action.payload);
      state.patient.splice(index, 1);
    });
  },
});

export default patientSlice.reducer;
