import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  vendor: [],
  error: false,
};

export const getVendor = createAsyncThunk("vendor/getVendor", async () => {
  const responce = await axios.get("http://localhost:3000/vendor/getVendor");
  return responce.data.data;
});

export const addVendor = createAsyncThunk(
  "vendor/addVendor",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("companyname", values.companyname);
      formData.append("mobile", values.mobile);
      formData.append("email", values.email);
      formData.append("gstno", values.gstno);
      formData.append("vendor_img", values.vendor_img);

      const responce = await axios.post(
        "http://localhost:3000/vendor/addVendor",
        formData
      );

      return responce.data.data;
    } catch (error) {}
  }
);

export const updateVendor = createAsyncThunk(
  "vendor/updateVendor",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("companyname", values.companyname);
      formData.append("mobile", values.mobile);
      formData.append("email", values.email);
      formData.append("gstno", values.gstno);
      formData.append("vendor_img", values.vendor_img);

      const responce = await axios.put(
        `http://localhost:3000/vendor/updateVendor/${values.id}`,
        formData
      );

      return responce.data.data;
    } catch (error) {}
  }
);

export const deleteVendor = createAsyncThunk(
  "vendor/deleteVendor",
  async (id) => {
    await axios.delete(`http://localhost:3000/vendor/deleteVendor/${id}`);
    return id;
  }
);

export const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getVendor.fulfilled, (state, action) => {
      state.vendor = action.payload;
    });
    builder.addCase(addVendor.fulfilled, (state, action) => {
      state.vendor.push(action.payload);
    });
    builder.addCase(updateVendor.fulfilled, (state, action) => {
      const index = state.vendor.findIndex((v) => v.id == action.payload.id);
      state.vendor[index] = action.payload;
    });
    builder.addCase(deleteVendor.fulfilled, (state, action) => {
      const index = state.vendor.findIndex((v) => v.id === action.payload);
      state.vendor.splice(index, 1);
    });
  },
});

export default vendorSlice.reducer;