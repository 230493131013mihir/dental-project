import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  faq: [],
};

// GET
export const getFAQ = createAsyncThunk("faq/getFAQ", async () => {
  const res = await axios.get("http://localhost:3000/faq/getFAQ");
  return res.data.data;
});

// ADD
export const addFAQ = createAsyncThunk("faq/addFAQ", async (values) => {
  const res = await axios.post(
    "http://localhost:3000/faq/addFAQ",
    values
  );
  return res.data.data;
});

// UPDATE
export const updateFAQ = createAsyncThunk(
  "faq/updateFAQ",
  async (values) => {
    const res = await axios.put(
      `http://localhost:3000/faq/updateFAQ/${values.id}`,
      values
    );
    return res.data.data;
  }
);

// DELETE
export const deleteFAQ = createAsyncThunk(
  "faq/deleteFAQ",
  async (id) => {
    await axios.delete(
      `http://localhost:3000/faq/deleteFAQ/${id}`
    );
    return id;
  }
);

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFAQ.fulfilled, (state, action) => {
      state.faq = action.payload;
    });

    builder.addCase(addFAQ.fulfilled, (state, action) => {
      state.faq.push(action.payload);
    });

    builder.addCase(updateFAQ.fulfilled, (state, action) => {
      const index = state.faq.findIndex(
        (v) => v.id === action.payload.id
      );
      state.faq[index] = action.payload;
    });

    builder.addCase(deleteFAQ.fulfilled, (state, action) => {
      const index = state.faq.findIndex(
        (v) => v.id === action.payload
      );
      state.faq.splice(index, 1);
    });
  },
});

export default faqSlice.reducer;