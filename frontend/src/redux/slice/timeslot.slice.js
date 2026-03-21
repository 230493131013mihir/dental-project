import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  timeslot: [],
  error: false,
};

export const getTimeslot = createAsyncThunk("timeslot/getTimeslot", async () => {
  const responce = await axios.get("http://localhost:3000/timeslot/getTimeslot");
  console.log(responce.data.data);

  return responce.data.data;
});

export const addTimeslot = createAsyncThunk(
  "timeslot/addTimeslot",
  async (values) => {
    try {
      console.log(values);

      const formData = new FormData();
      formData.append("user_id", values.user_id);
      formData.append("date", values.date);
      formData.append("startdate", values.startdate);
      formData.append("enddate", values.enddate);

      const responce = await axios.post(
        "http://localhost:3000/timeslot/addTimeslot",
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const updateTimeslot = createAsyncThunk(
  "timeslot/updateTimeslot",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("user_id", values.user_id);
      formData.append("date", values.date);
      formData.append("startdate", values.startdate);
      formData.append("enddate", values.enddate);

      const responce = await axios.put(
        `http://localhost:3000/timeslot/updateTimeslot/${values.id}`,
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteTimeslot = createAsyncThunk(
  "timeslot/deleteTimeslot",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/timeslot/deleteTimeslot/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const timeslotSlice = createSlice({
  name: "timeslot",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getTimeslot.fulfilled, (state, action) => {
      console.log(action.payload);
      state.timeslot = action.payload;
    });
    builder.addCase(addTimeslot.fulfilled, (state, action) => {
      state.timeslot.push(action.payload);
    });
    builder.addCase(updateTimeslot.fulfilled, (state, action) => {
      const index = state.timeslot.findIndex((v) => v.id == action.payload.id);

      state.timeslot[index] = action.payload;
    });
    builder.addCase(deleteTimeslot.fulfilled, (state, action) => {
      const index = state.timeslot.findIndex((v) => v.id === action.payload);

      state.timeslot.splice(index, 1);
    });
  },
});

export default timeslotSlice.reducer;