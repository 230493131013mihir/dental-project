import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  blog: [],
  error: false,
};

// GET
export const getBlog = createAsyncThunk("blog/getBlog", async () => {
  const res = await axios.get("http://localhost:3000/blog/getBlog");
  return res.data.data;
});

// ADD
export const addBlog = createAsyncThunk("blog/addBlog", async (values) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("description", values.description);
  formData.append("date", values.date);
  formData.append("blog_img", values.blog_img);

  const res = await axios.post(
    "http://localhost:3000/blog/addBlog",
    formData
  );

  return res.data.data;
});

// UPDATE
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("date", values.date);
    formData.append("blog_img", values.blog_img);

    const res = await axios.put(
      `http://localhost:3000/blog/updateBlog/${values.id}`,
      formData
    );

    return res.data.data;
  }
);

// DELETE
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id) => {
    await axios.delete(
      `http://localhost:3000/blog/deleteBlog/${id}`
    );
    return id;
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.blog.push(action.payload);
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      const index = state.blog.findIndex(
        (v) => v.id === action.payload.id
      );
      state.blog[index] = action.payload;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      const index = state.blog.findIndex(
        (v) => v.id === action.payload
      );
      state.blog.splice(index, 1);
    });
  },
});

export default blogSlice.reducer;