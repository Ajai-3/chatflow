import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, signupUserThunk, logoutUserThunk } from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
  builder
    .addCase(loginUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
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

    .addCase(logoutUserThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(logoutUserThunk.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    })
    .addCase(logoutUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to logout";
    });
}

});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
