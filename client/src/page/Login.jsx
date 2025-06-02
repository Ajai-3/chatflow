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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-300/50 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaSignInAlt className="text-2xl text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Welcome Back
            </h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>

          <form className="space-y-6">
            {/* Username Field */}
            <div>
              <div className="relative">
                <div className="absolute top-1/2 left-0 pl-4 -translate-y-1/2 pointer-events-none z-10">
                  <FaUser className="text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-base-100 transition-all duration-300"
                  required
                />
              </div>
              {isUsernameInvalid && (
                <p className="text-xs text-orange-500 mt-1 ml-1">
                  Invalid username format
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 pl-4 -translate-y-1/2 pointer-events-none z-10">
                <FaLock className="text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-base-200/50 border border-base-300/30 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-base-100 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-1/2 right-0 pr-4 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors z-10"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {isPasswordInvalid && (
                <p className="text-sm text-orange-500 mt-2 ml-1">
                  Password: 8+ chars with uppercase, lowercase & number
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-content font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-base-100 text-base-content/60">
                  New here?
                </span>
              </div>
            </div>

            {/* Link to Signup */}
            <a
              href="/signup"
              className="w-full py-3 border-2 border-primary/20 hover:border-primary/40 text-primary font-semibold rounded-xl transition-all duration-300 flex items-center justify-center hover:bg-primary/5"
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
