import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk } from './user.thunk'

const initialState = {
    isAuthenticated: false
  }
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.entities.push(action.payload)
    })
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.entities.push(action.payload)
    })
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.entities.push(action.payload)
    })
  },
})

// Export actions only if they exist
export const { login, logout } = userSlice.actions
export default userSlice.reducer
