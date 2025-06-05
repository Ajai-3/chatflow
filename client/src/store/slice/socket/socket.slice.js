import { io } from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 socket: null
}

export const soketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
     initializeSocket: (state, action) => {
        const socket = io(import.meta.env.VITE_APP_URL)

        socket.on('connect', () => {
          console.log("socket connected")
        })
        state.socket = socket
     }
  }
})

export const { initializeSocket } = soketSlice.actions

export default soketSlice.reducer