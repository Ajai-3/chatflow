import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Validation functions
  const isUsernameEmpty = username.trim().length === 0;
  const isPasswordEmpty = password.trim().length === 0;

  const isUsernameInvalid =
    username.length > 0 &&
    !/^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(username.trim());

  const isPasswordInvalid =
    password.length > 0 &&
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim values
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Check for empty fields
    if (isUsernameEmpty) {
      toast.error("Username is required");
      return;
    }

    if (isPasswordEmpty) {
      toast.error("Password is required");
      return;
    }

    // Check for invalid formats
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

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      toast.success("Login successful!");
      console.log("Login data:", {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      // Here you would typically redirect or update app state
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                className="w-full pl-10 pr-10 py-2.5 bg-base-200/50 border border-base-300/30 rounded-lg text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-base-100 transition-all duration-200"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-content font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-content/30 border-t-primary-content rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
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

export default Login;
