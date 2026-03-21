import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  salary: [],
  error: false,
};

export const getSalary = createAsyncThunk("salary/getSalary", async () => {
  const responce = await axios.get("http://localhost:3000/salary/getSalary");
  console.log(responce.data.data);

  return responce.data.data;
});

export const addSalary = createAsyncThunk(
  "salary/addSalary",
  async (values) => {
    try {
      console.log(values);

      const formData = new FormData();
      formData.append("user_id", values.user_id);
      formData.append("payment_id", values.payment_id);
      formData.append("paymenttype", values.paymenttype);
      formData.append("amount", values.amount);
      formData.append("status", values.status);
      formData.append("workingdays", values.workingdays);

      const responce = await axios.post(
        "http://localhost:3000/salary/addSalary",
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const updateSalary = createAsyncThunk(
  "salary/updateSalary",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("user_id", values.user_id);
      formData.append("payment_id", values.payment_id);
      formData.append("paymenttype", values.paymenttype);
      formData.append("amount", values.amount);
      formData.append("status", values.status);
      formData.append("workingdays", values.workingdays);

      const responce = await axios.put(
        `http://localhost:3000/salary/updateSalary/${values.id}`,
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteSalary = createAsyncThunk(
  "salary/deleteSalary",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/salary/deleteSalary/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const salarySlice = createSlice({
  name: "salary",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSalary.fulfilled, (state, action) => {
      console.log(action.payload);
      state.salary = action.payload;
    });
    builder.addCase(addSalary.fulfilled, (state, action) => {
      state.salary.push(action.payload);
    });
    builder.addCase(updateSalary.fulfilled, (state, action) => {
      const index = state.salary.findIndex((v) => v.id == action.payload.id);

      state.salary[index] = action.payload;
    });
    builder.addCase(deleteSalary.fulfilled, (state, action) => {
      const index = state.salary.findIndex((v) => v.id === action.payload);

      state.salary.splice(index, 1);
    });
  },
});

export default salarySlice.reducer;