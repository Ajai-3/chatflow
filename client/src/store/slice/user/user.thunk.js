import axiosInstance from "../../../api/axiosINstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

//=======================================================================================================================
//  LOGINUSERTHUNK
//=======================================================================================================================
// Handles user login by sending credentials to the server and returning the response data or error.
//=======================================================================================================================
export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      return response.data.responseData;
    } catch (error) {
      console.log(error?.response?.data?.errMessage);
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Login failed. Please try again.";
      return rejectWithValue(message);
    }
  }
);
//=======================================================================================================================
//  GET ALL USERNAMES THUNK
//=======================================================================================================================
// This will get all user names to check if the user name alredy exist or not.
//=======================================================================================================================
export const getAllUsernameThunk = createAsyncThunk("user/all-usernames", async (_, { rejectWithValue }) => {
  try {
    const responce = await axiosInstance.get("/user/all-usernames")
    return responce.data.responseData
  } catch (error) {
    console.log(error?.response?.data?.errMessage);
    const message =
      error.response?.data?.errMessage ||
      error.response?.data?.message ||
      "Failed to fetch usernames.";
    return rejectWithValue(message);
  }
})

//=======================================================================================================================
//  SIGNUPUSERTHUNK
//=======================================================================================================================
// Handles user registration by sending user details to the server and returning the response or error.
//=======================================================================================================================
export const signupUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullname, username, gender, password }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post("/user/signup", {
        fullname,
        username,
        gender,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.errMessage);
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Sign up failed. Please try again.";
      return rejectWithValue(message);
    }
  }
);


//=======================================================================================================================
//  GET PROFILE THUNK
//=======================================================================================================================
// Handles user profile of the logged user
//=======================================================================================================================
export const getProfileThunk = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get("/user/profile");
      return response.data.responseData;
    } catch (error) {
      console.log(error?.response?.data?.errMessage);
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Load profile is failed";
      return rejectWithValue(message);
    }
  }
);

//=======================================================================================================================
//  GET CHAT USERS THUNK
//=======================================================================================================================
// Handles fetching chat users with their last messages
//=======================================================================================================================
export const getChatUsersThunk = createAsyncThunk(
  "user/get-chat-users",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get("/user/get-chat-users");
      return response.data.responseData;
    } catch (error) {
      console.log(error?.response?.data?.errMessage);
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Failed to load chat users";
      return rejectWithValue(message);
    }
  }
);

//=======================================================================================================================
// SEARCH USER 
//=======================================================================================================================
// Handles fetching the users with their user name 
//=======================================================================================================================
export const searchUserThunk = createAsyncThunk(
  "user/search",
  async ({ username }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/user/search?username=${username}`);

      console.log(response.data)
      return response.data.responseData;
    } catch (error) {
      console.log(error?.response?.data?.errMessage);
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Failed to load chat users";
      return rejectWithValue(message);
    }
  }
);


//=======================================================================================================================
//  LOG OUT USRE
//=======================================================================================================================
// Handles user logout if the user logined
//=======================================================================================================================
export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post("/user/logout");
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.errMessage);
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Sign up failed. Please try again.";
      return rejectWithValue(message);
    }
  }
);