import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  services: [],
  error: false,
};

export const getServices = createAsyncThunk(
  "services/getServices",
  async () => {
    const responce = await axios.get("http://localhost:3000/services/getServices");
    return responce.data.data;
  }
);

export const addServices = createAsyncThunk(
  "services/addServices",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("department_id", values.department_id);
      formData.append("user_id", values.user_id);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("services_img", values.services_img);

      const responce = await axios.post(
        "http://localhost:3000/services/addServices",
        formData
      );
 console.log(responce);
      return responce.data.data;
    } catch (error) {}
  }
);

export const updateServices = createAsyncThunk(
  "services/updateServices",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("department_id", values.department_id);
      formData.append("user_id", values.user_id);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("services_img", values.services_img);

      const responce = await axios.put(
        `http://localhost:3000/services/updateServices/${values.id}`,
        formData
      );
    console.log(responce);

      return responce.data.data;
    } catch (error) {}
  }
);

export const deleteServices = createAsyncThunk(
  "services/deleteServices",
  async (id) => {
        console.log(id);

    const responce =  await axios.delete(
      `http://localhost:3000/services/deleteServices/${id}`
    );
    console.log(responce);


    return id;
  }
);

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });
    builder.addCase(addServices.fulfilled, (state, action) => {
      state.services.push(action.payload);
    });
    builder.addCase(updateServices.fulfilled, (state, action) => {
      const index = state.services.findIndex(
        (v) => v.id == action.payload.id
      );
      state.services[index] = action.payload;
    });
    builder.addCase(deleteServices.fulfilled, (state, action) => {
      const index = state.services.findIndex(
        (v) => v.id === action.payload
      );
      state.services.splice(index, 1);
    });
  },
});

export default servicesSlice.reducer;