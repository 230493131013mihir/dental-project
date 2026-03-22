import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  medicine: [],
  error: false,
};

export const getMedicine = createAsyncThunk(
  "medicine/getMedicine",
  async () => {
    const responce = await axios.get(
      "http://localhost:3000/medicine/getMedicine",
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);

export const addMedicine = createAsyncThunk(
  "medicine/addMedicine",
  async (values) => {
    try {
      console.log(values);

      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("vendor_id", values.vendor_id);
      formData.append("department_id", values.department_id);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("expirydate", values.expirydate);
      formData.append("medicine_img", values.medicine_img);

      const responce = await axios.post(
        "http://localhost:3000/medicine/addMedicine",
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const updateMedicine = createAsyncThunk(
  "medicine/updateMedicine",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("vendor_id", values.vendor_id);
      formData.append("department_id", values.department_id);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("expirydate", values.expirydate);
      formData.append("medicine_img", values.medicine_img);

      const responce = await axios.put(
        `http://localhost:3000/medicine/updateMedicine/${values.id}`,
        formData,
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
      state.medicine.push(action.payload);
    });

    builder.addCase(updateMedicine.fulfilled, (state, action) => {
      const index = state.medicine.findIndex(
        (v) => v.id == action.payload.id
      );

      state.medicine[index] = action.payload;
    });

    builder.addCase(deleteMedicine.fulfilled, (state, action) => {
      const index = state.medicine.findIndex(
        (v) => v.id === action.payload
      );

      state.medicine.splice(index, 1);
    });
  },
});

export default medicineSlice.reducer;