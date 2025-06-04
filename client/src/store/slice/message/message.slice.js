import { createSlice } from '@reduxjs/toolkit'
import { getMessageThunk, sendMessageThunk } from './message.thunk';

const initialState = { 
  buttonLoading: false,
  screenLoading: false,
  messages: null
 }

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {

  },
   extraReducers: (builder) => {
      builder
      // Send messages
        .addCase(sendMessageThunk.pending, (state) => {
          state.buttonLoading = true;
          state.error = null;
        })
        .addCase(sendMessageThunk.fulfilled, (state, action) => {
          state.messages = [...state.messages, action.payload?.newMessage]
          state.buttonLoading = false;
          state.error = null;
        })
        .addCase(sendMessageThunk.rejected, (state, action) => {
          state.buttonLoading = false;
          state.error = action.payload || "Failed to login";
        })

        // Get messages
        .addCase(getMessageThunk.pending, (state) => {
          state.screenLoading = true;
          state.error = null;
        })
        .addCase(getMessageThunk.fulfilled, (state, action) => {
          state.messages = action.payload?.messages
          state.screenLoading = false;
          state.error = null;
        })
        .addCase(getMessageThunk.rejected, (state, action) => {
          state.screenLoading = false;
          state.error = action.payload || "Failed to login";
        })
    }
})

export const {  } = messageSlice.actions
export default messageSlice.reducer