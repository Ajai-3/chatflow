import React from "react";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
  return (
    <div className="min-h-screen p-4 bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold mb-4 text-base-content">
        🌈 DaisyUI Theme Switcher
      </h1>
      <ThemeSwitcher />
      <button className="btn btn-primary mt-4">Example Button</button>
    </div>
  );
};

export default App;
