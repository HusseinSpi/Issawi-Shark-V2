import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import { createRecentActivity } from "./recentActivityThunks";

axios.defaults.withCredentials = true;

export const getAllProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("projects");
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (err) {
      console.error("Error fetching projects:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("projects", projectData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Project created successfully");
      dispatch(
        createRecentActivity({
          type: "project",
          description: `Project created: ${projectData.get("title")}`,
        })
      );
      return response.data.data;
    } catch (err) {
      console.error("Error creating project:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getProject = createAsyncThunk(
  "project/getProject",
  async ({ projectId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`projects/${projectId}`);
      dispatch(
        createRecentActivity({
          type: "project",
          description: `Fetched project: ${projectId}`,
        })
      );
      return response.data.data;
    } catch (err) {
      console.error("Error fetching project:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ projectId, updateData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch(`projects/${projectId}`, updateData);
      dispatch(
        createRecentActivity({
          type: "project",
          description: `Updated project: ${projectId}`,
        })
      );
      return response.data.data;
    } catch (err) {
      console.error("Error updating project:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateRating = createAsyncThunk(
  "project/updateRating",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`projects/${projectId}/rating`);
      return response.data.data;
    } catch (err) {
      console.error("Error updating rating:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`projects/${projectId}`);
      toast.success("Project deleted successfully");
      dispatch(
        createRecentActivity({
          type: "project",
          description: `Deleted project: ${projectId}`,
        })
      );
    } catch (err) {
      console.error("Error deleting project:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);
