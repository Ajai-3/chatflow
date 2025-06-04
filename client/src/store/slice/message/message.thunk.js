import axiosInstance from "../../../api/axiosINstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

//=======================================================================================================================
//  SEND MESSAGE THUNK
//=======================================================================================================================
// Handles user to send message.
//=======================================================================================================================
export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message
      });
      return response.data.responseData;
    } catch (error) {
      console.log(error?.response?.data?.errMessage);
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Sending message failed";
      return rejectWithValue(message);
    }
  }
);

//=======================================================================================================================
// GET MESSAGE THUNK
//=======================================================================================================================
// Handles user to get messages.
//=======================================================================================================================
export const getMessageThunk = createAsyncThunk(
  "message/get-messages",
  async ({ recieverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/get-messages/${recieverId}`);
      return response.data.responseData;
    } catch (error) {
      const message =
        error.response?.data?.errMessage ||
        error.response?.data?.message ||
        "Fetching messages failed";
      return rejectWithValue(message);
    }
  }
);

//=======================================================================================================================
//  GET ALL MESSAGES THUNK
//=======================================================================================================================
// This will get all meeages with that user.
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