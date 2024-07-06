import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import { createRecentActivity as createActivity } from "./recentActivityThunks";

axios.defaults.withCredentials = true;

export const fetchUsersData = createAsyncThunk(
  "user/fetchUsersData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("users");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch users data");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("users/me");
      return response.data;
    } catch (error) {
      toast.error("Failed to get current user");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUser",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`users/profile/${userId}`);
      dispatch(
        createActivity({
          type: "user",
          description: `Fetched user: ${userId}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to get user");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    {
      userName,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      photo,
      age,
      github,
      about,
      facebook,
      twitter,
      linkedin,
      instagram,
    },
    { dispatch, rejectWithValue }
  ) => {
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordConfirm,
      photo,
      age,
      github,
      about,
      facebook,
      twitter,
      linkedin,
      instagram,
    };
    try {
      const response = await axios.post("users/signup", data);
      toast.success("Signup successful!");
      dispatch(
        createActivity({
          type: "user",
          description: `User signed up: ${userName}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Signup failed");
      console.error("Signup error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const data = { email, password };
    try {
      const response = await axios.post("users/login", data);
      toast.success("Login successful!");
      dispatch(
        createActivity({
          type: "user",
          description: `User logged in: ${email}`,
        })
      );
      window.location.reload();
      return response.data;
    } catch (error) {
      toast.error("Login failed");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch("users/updateMe", userData);
      dispatch(
        createActivity({
          type: "user",
          description: `User updated: ${userData.username}`,
        })
      );
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { dispatch, rejectWithValue }) => {
    const data = { email };
    try {
      const response = await axios.post("users/forgotPassword", data);
      toast.success("Password reset email sent");
      dispatch(
        createActivity({
          type: "user",
          description: `Password reset email sent to: ${email}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to send password reset email");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { resetToken, password, passwordConfirm },
    { dispatch, rejectWithValue }
  ) => {
    const data = { password, passwordConfirm };
    try {
      const response = await axios.patch(
        `users/resetPassword/${resetToken}`,
        data
      );
      toast.success("Password reset successful");
      dispatch(
        createActivity({
          type: "user",
          description: `Password reset with token: ${resetToken}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to reset password");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (
    { currentPassword, password, newPassword },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch("users/updateMyPassword", {
        passwordCurrent: currentPassword,
        password: password,
        passwordConfirm: newPassword,
      });
      dispatch(
        createActivity({
          type: "user",
          description: `User password updated`,
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
