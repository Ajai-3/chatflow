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
