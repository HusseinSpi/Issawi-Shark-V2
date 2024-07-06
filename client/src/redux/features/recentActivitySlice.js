import { createSlice } from "@reduxjs/toolkit";
import {
  getRecentActivity,
  createRecentActivity,
} from "../thunk/recentActivityThunks";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const recentActivitySlice = createSlice({
  name: "recentActivity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecentActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getRecentActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(createRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRecentActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(createRecentActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

export default recentActivitySlice.reducer;
