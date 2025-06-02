import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isUsernameInvalid =
    username.length > 0 && !/^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(username);

  const isPasswordInvalid =
    password.length > 0 &&
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (username.trim() === "") {
      
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-base-100/90 backdrop-blur-xl rounded-2xl shadow-xl border border-base-300/50 p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaSignInAlt className="text-lg text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-base-content mb-1">
              Welcome Back
            </h1>
            <p className="text-sm text-base-content/60">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Username Field */}
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaUser className="text-sm text-base-content/40" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-base-200/50 border border-base-300/30 rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-base-100 transition-all duration-200"
                
              />
              {isUsernameInvalid && (
                <p className="text-xs text-orange-500 mt-1 ml-1">
                  Invalid format
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaLock className="text-sm text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-base-200/50 border border-base-300/30 rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-base-100 transition-all duration-200"
                
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-3 right-0 pr-3 text-sm text-base-content/40 hover:text-base-content transition-colors z-10"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {isPasswordInvalid && (
                <p className="text-xs text-orange-500 mt-1 ml-1">
                  Password: 8+ chars with uppercase, lowercase & number
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-content font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg text-sm"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-base-100 text-base-content/60">
                  New here?
                </span>
              </div>
            </div>

            {/* Link to Signup */}
            <a
              href="/signup"
              className="w-full py-2.5 border border-primary/20 hover:border-primary/40 text-primary font-medium rounded-lg transition-all duration-200 flex items-center justify-center hover:bg-primary/5 text-sm"
            >
              Create Account
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
