import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  faq: [],
};

// GET
export const getFAQ = createAsyncThunk("faq/getFAQ", async () => {
  const responce = await axios.get("http://localhost:3000/faq/getFAQ");

   console.log(responce.data.data);
   
  return responce.data.data;
});

// ADD
export const addFAQ = createAsyncThunk("faq/addFAQ", async (values) => {
 console.log(values);
 
//  const formData = new FormData();
//   formData.append("name", values.name);
//   formData.append("answer", values.answer);

  const res = await axios.post(
    "http://localhost:3000/faq/addFAQ",
    values
  );

  console.log(res);
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
        (v) => v.id == action.payload.id
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