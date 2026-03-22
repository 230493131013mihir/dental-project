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

export const addInsfrastructure = createAsyncThunk(
  "insfrastructure/addInsfrastructure",
  async (values) => {
    try {
      console.log(values);

      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("department_id", values.department_id);
      formData.append("type_id", values.type_id);
      formData.append("vendor_id", values.vendor_id);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("insfrastructure_img", values.insfrastructure_img);

      const responce = await axios.post(
        "http://localhost:3000/insfrastructure/addInsfrastructure",
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const updateInsfrastructure = createAsyncThunk(
  "insfrastructure/updateInsfrastructure",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("department_id", values.department_id);
      formData.append("type_id", values.type_id);
      formData.append("vendor_id", values.vendor_id);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("insfrastructure_img", values.insfrastructure_img);

      const responce = await axios.put(
        `http://localhost:3000/insfrastructure/updateInsfrastructure/${values.id}`,
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteInsfrastructure = createAsyncThunk(
  "insfrastructure/deleteInsfrastructure",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/insfrastructure/deleteInsfrastructure/${id}`,
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
      state.insfrastructure.push(action.payload);
    });

    builder.addCase(updateInsfrastructure.fulfilled, (state, action) => {
      const index = state.insfrastructure.findIndex(
        (v) => v.id == action.payload.id
      );

      state.insfrastructure[index] = action.payload;
    });

    builder.addCase(deleteInsfrastructure.fulfilled, (state, action) => {
      const index = state.insfrastructure.findIndex(
        (v) => v.id === action.payload
      );

      state.insfrastructure.splice(index, 1);
    });
  },
});

export default insfrastructureSlice.reducer;