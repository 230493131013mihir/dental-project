import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  testimonal: [],
};

// GET
export const getReviews = createAsyncThunk("testimonal/getReviews", async () => {
  const responce = await axios.get("http://localhost:3000/testimonial/getReviews");

   console.log("sdcsd",responce.data.data);
   
  return responce.data.data;
});

// ADD
export const addReview = createAsyncThunk("testimonial/addReview", async (values) => {
 console.log(values);
 
//  const formData = new FormData();
//   formData.append("name", values.name);
//   formData.append("answer", values.answer);

  const res = await axios.post(
    "http://localhost:3000/testimonial/addReview",
    values
  );

  console.log(res);
  return res.data.data;
});

// UPDATE
export const updateFAQ = createAsyncThunk(
  "testimonal/updateFAQ",
  async (values) => {
    const res = await axios.put(
      `http://localhost:3000/testimonal/updateFAQ/${values.id}`,
      values
    );
    return res.data.data;
  }
);

// DELETE
export const deleteFAQ = createAsyncThunk(
  "testimonal/deleteFAQ",
  async (id) => {
    await axios.delete(
      `http://localhost:3000/testimonal/deleteFAQ/${id}`
    );
    return id;
  }
);

export const faqSlice = createSlice({
  name: "testimonal",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReviews.fulfilled, (state, action) => {
      console.log(action.payload);
      
      state.testimonal = action.payload;
    });

    builder.addCase(addReview.fulfilled, (state, action) => {
      state.testimonal.push(action.payload);
    });

    builder.addCase(updateFAQ.fulfilled, (state, action) => {
      const index = state.testimonal.findIndex(
        (v) => v.id == action.payload.id
      );
      state.testimonal[index] = action.payload;
    });

    builder.addCase(deleteFAQ.fulfilled, (state, action) => {
      const index = state.testimonal.findIndex(
        (v) => v.id === action.payload
      );
      state.testimonal.splice(index, 1);
    });
  },
});

export default faqSlice.reducer;