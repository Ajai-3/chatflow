import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaIdCard,
} from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const isNameInvalid = name.length > 0 && name.trim().length < 2;

  const isUsernameInvalid =
    username.length > 0 && !/^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(username);

  const isPasswordInvalid =
    password.length > 0 &&
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);

  const isConfirmPasswordInvalid =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-base-200 to-primary/10 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-300/50 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUserPlus className="text-2xl text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Join Us
            </h1>
            <p className="text-base-content/60">Create your account</p>
          </div>

          <form className="space-y-5">
            {/* Name Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FaIdCard className="text-base-content/40" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-base-200/50 border-0 rounded-2xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-base-100 transition-all duration-300"
                required
              />
              {isNameInvalid && (
                <p className="text-sm text-orange-500 mt-2 ml-1">
                  Name must be at least 2 characters long
                </p>
              )}
            </div>

            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FaUser className="text-base-content/40" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-base-200/50 border-0 rounded-2xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-base-100 transition-all duration-300"
                required
              />
              {isUsernameInvalid && (
                <p className="text-sm text-orange-500 mt-2 ml-1">
                  Username must be 3-30 characters (letters, numbers, dashes
                  only)
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FaLock className="text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-base-200/50 border-0 rounded-2xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-base-100 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors z-10"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {isPasswordInvalid && (
                <p className="text-sm text-orange-500 mt-2 ml-1">
                  Password must be 8+ characters with uppercase, lowercase &
                  number
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <FaLock className="text-base-content/40" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-base-200/50 border-0 rounded-2xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-base-100 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors z-10"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {isConfirmPasswordInvalid && (
                <p className="text-sm text-orange-500 mt-2 ml-1">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-secondary-content font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-base-100 text-base-content/60">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Link to Login */}
            <a
              href="/login"
              className="w-full py-4 border-2 border-secondary/20 hover:border-secondary/40 text-secondary font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center hover:bg-secondary/5"
            >
              Sign In
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
