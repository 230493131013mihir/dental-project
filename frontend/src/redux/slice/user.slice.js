import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  user: [],
  error: false,
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const responce = await axios.get("http://localhost:3000/user/getUser");
  console.log(responce.data.data);

  return responce.data.data;
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (values) => {
    try {
      console.log(values);

      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("department_id", values.department_id);
      formData.append("role_id", values.role_id);
      formData.append("name", values.name);
      formData.append("dob", values.dob);
      formData.append("email", values.email);
      formData.append("qualification", values.qualification);
      formData.append("address", values.address);
      formData.append("user_img", values.user_img);

      const responce = await axios.post(
        "http://localhost:3000/user/addUser",
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (values) => {
    try {
      const formData = new FormData();
      formData.append("branch_id", values.branch_id);
      formData.append("department_id", values.department_id);
      formData.append("role_id", values.role_id);
      formData.append("name", values.name);
      formData.append("dob", values.dob);
      formData.append("email", values.email);
      formData.append("qualification", values.qualification);
      formData.append("address", values.address);
      formData.append("user_img", values.user_img);

      const responce = await axios.put(
        `http://localhost:3000/user/updateUser/${values.id}`,
        formData,
      );
      console.log(responce);

      return responce.data.data;
    } catch (error) {}
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id) => {
    console.log(id);

    const responce = await axios.delete(
      `http://localhost:3000/user/deleteUser/${id}`,
    );
    console.log(responce);

    return id;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.user.push(action.payload);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.user.findIndex((v) => v.id == action.payload.id);

      state.user[index] = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const index = state.user.findIndex((v) => v.id === action.payload);

      state.user.splice(index, 1);
    });
  },
});

export default userSlice.reducer;