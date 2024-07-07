import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  updateRating,
  deleteProject,
} from "../thunk/projectThunks";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(getProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.data.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
      })
      .addCase(getProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.data.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(updateRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.data.findIndex(
          (project) => project.id === action.meta.arg.id
        );
        if (index !== -1) {
          state.data[index].rating = action.payload;
        }
      })
      .addCase(updateRating.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

export default projectSlice.reducer;
