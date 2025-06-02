import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/authentication/Login";
import Signup from "./page/authentication/Signup";
import ThemeProvider from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
