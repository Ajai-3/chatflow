import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import ThemeProvider from "./context/ThemeContext.jsx"
import { store } from "./store/store.js"
import App from "./App.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
