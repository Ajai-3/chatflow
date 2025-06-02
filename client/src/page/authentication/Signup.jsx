import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaIdCard,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // Validation functions
  const isNameEmpty = name.trim().length === 0;
  const isUsernameEmpty = username.trim().length === 0;
  const isPasswordEmpty = password.trim().length === 0;
  const isConfirmPasswordEmpty = confirmPassword.trim().length === 0;

  const isNameInvalid = name.length > 0 && name.trim().length < 2;

  const isUsernameInvalid =
    username.length > 0 &&
    !/^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(username.trim());

  const isPasswordInvalid =
    password.length > 0 &&
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);

  const isConfirmPasswordInvalid =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim values
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Check for empty fields
    if (isNameEmpty) {
      toast.error("Full name is required");
      return;
    }

    if (isUsernameEmpty) {
      toast.error("Username is required");
      return;
    }

    if (isPasswordEmpty) {
      toast.error("Password is required");
      return;
    }

    if (isConfirmPasswordEmpty) {
      toast.error("Please confirm your password");
      return;
    }

    // Check for invalid formats
    if (trimmedName.length < 2) {
      toast.error("Name must be at least 2 characters long");
      return;
    }

    if (!/^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(trimmedUsername)) {
      toast.error(
        "Username must be 3-30 characters (letters, numbers, dashes only)"
      );
      return;
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(trimmedPassword)) {
      toast.error(
        "Password: 8+ chars with uppercase, lowercase & number"
      );
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      toast.success("Account created successfully!");
      console.log("Signup data:", {
        name: trimmedName,
        username: trimmedUsername,
        password: trimmedPassword,
      });

      // Here you would typically redirect or update app state
    } catch (error) {
      toast.error("Account creation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-base-200 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-base-100/90 backdrop-blur-xl rounded-2xl shadow-xl border border-base-300/50 p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaUserPlus className="text-lg text-secondary" />
            </div>
            <h1 className="text-2xl font-bold text-base-content mb-1">
              Join Us
            </h1>
            <p className="text-sm text-base-content/60">Create your account</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaIdCard className="text-sm text-base-content/40" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-base-200/50 border border-base-300/30 rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100 transition-all duration-200"
                disabled={isLoading}
              />
              {isNameInvalid && (
                <p className="text-xs text-orange-500 mt-1 ml-1">Too short</p>
              )}
            </div>

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
                className="w-full pl-10 pr-3 py-2.5 bg-base-200/50 border border-base-300/30 rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100 transition-all duration-200"
                disabled={isLoading}
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
                className="w-full pl-10 pr-10 py-2.5 bg-base-200/50 border border-base-300/30 rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100 transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-3 right-0 pr-3 text-sm text-base-content/40 hover:text-base-content transition-colors z-10"
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {isPasswordInvalid && (
                <p className="text-xs text-orange-500 mt-1 ml-1">
                  Password: 8+ chars with uppercase, lowercase & number
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaLock className="text-sm text-base-content/40" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-base-200/50 border border-base-300/30 rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100 transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute top-3 right-0 pr-3 text-sm text-base-content/40 hover:text-base-content transition-colors z-10"
                disabled={isLoading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {isConfirmPasswordInvalid && (
                <p className="text-xs text-orange-500 mt-1 ml-1">Don't match</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-secondary-content font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-secondary-content/30 border-t-secondary-content rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-base-100 text-base-content/60">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Link to Login */}
            <a
              href="/login"
              className="w-full py-2.5 border border-secondary/20 hover:border-secondary/40 text-secondary font-medium rounded-lg transition-all duration-200 flex items-center justify-center hover:bg-secondary/5 text-sm"
            >
              Sign In
            </a>
          </form>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--fallback-b1,oklch(var(--b1)))",
            color: "var(--fallback-bc,oklch(var(--bc)))",
            border: "1px solid var(--fallback-b3,oklch(var(--b3)))",
          },
        }}
      />
    </div>
  );
};

export default Signup;
