import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  department: [],
  error: false,
};

export const getDepartment = createAsyncThunk(
  "department/getDepartment",
  async () => {
    const responce = await axios.get(
      "http://localhost:3000/department/getDepartment",
    );
    console.log(responce.data.data);

    return responce.data.data;
  },
);

export const addDepartment = createAsyncThunk(
  "department/addDepartment",
  async (values) => {
    try {
      console.log(values);

      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("mobile", values.mobile);
      formData.append("department_img", values.department_img);

      const responce = await axios.post(
        "http://localhost:3000/department/addDepartment",
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) { }
  },
);

export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async (values) => {
    try {
      // console.log(values);

      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("mobile", values.mobile);
      formData.append("department_img", values.department_img);

      const responce = await axios.put(
        `http://localhost:3000/department/updateDepartment/${values.id}`,
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) { }
  },
);

export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/department/deleteDepartment/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getDepartment.fulfilled, (state, action) => {
      console.log(action.payload);
      state.department = action.payload;
    });
    builder.addCase(addDepartment.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.department.push(action.payload);

    });
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      const index = state.department.findIndex((v) => v.id == action.payload.id);

      state.department[index] = action.payload;
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      const index = state.department.findIndex((v) => v.id === action.payload);

      state.department.splice(index, 1);
    });
  },
});

export default departmentSlice.reducer;
