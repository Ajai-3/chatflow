import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, signupUserThunk, logoutUserThunk, getProfileThunk, getChatUsersThunk } from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  user: null,
  chatUsers: [],
  loading: false,
  selectedUser: null,
  screenLoading: true,
  chatUsersLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
     setSelectUser: (state, action) => {
        state.selectedUser = action.payload
     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
        state.isAuthenticated = false;
      })

      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to signup";
        state.isAuthenticated = false;
      })

      .addCase(getProfileThunk.pending, (state) => {
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.screenLoading = false;
        state.error = action.payload || "Failed to get profile";
        state.isAuthenticated = false;
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.chatUsers = [];
        state.selectedUser = null;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to logout";
      })

      .addCase(getChatUsersThunk.pending, (state) => {
        state.chatUsersLoading = true;
        state.error = null;
      })
      .addCase(getChatUsersThunk.fulfilled, (state, action) => {
        state.chatUsersLoading = false;
        state.chatUsers = action.payload;
        state.error = null;
      })
      .addCase(getChatUsersThunk.rejected, (state, action) => {
        state.chatUsersLoading = false;
        state.error = action.payload || "Failed to load chat users";
      });
  }

});

export const { setSelectUser } = userSlice.actions;
export default userSlice.reducer;
