import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const togglePassword = () => setShowPassword((prev) => !prev);

  const validateAll = () => {
    const newErrors = {};
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername) newErrors.username = "Username is required";
    if (!trimmedPassword) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!e.target.value.trim()) newErrors.username = "Username is required";
      else delete newErrors.username;
      return newErrors;
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!e.target.value.trim()) newErrors.password = "Password is required";
      else delete newErrors.password;
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsLoading(true);
    try {
      const resultAction = await dispatch(
        loginUserThunk({ username: username.trim(), password: password.trim() })
      );

      if (loginUserThunk.fulfilled.match(resultAction)) {
        setPassword("");
        setUsername("");
        navigate("/");
        toast.success("Login successfull.");
      } else {
        toast.error(resultAction.payload || "Login failed");
      }
    } catch {
      setErrors({ server: "Login failed. Please try again." });
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
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaUser className="text-sm text-base-content/40" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm placeholder:text-base-content/40 focus:outline-none transition-all duration-200 ${
                  errors.username
                    ? "border-red-600 text-red-600 focus:ring-red-600 focus:border-red-600"
                    : "border-base-300/30 bg-base-200/50 focus:ring-primary/50 focus:border-primary/50 focus:bg-base-100"
                }`}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-xs text-red-600 mt-1 ml-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaLock className="text-sm text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm placeholder:text-base-content/40 focus:outline-none transition-all duration-200 ${
                  errors.password
                    ? "border-red-600 text-red-600 focus:ring-red-600 focus:border-red-600"
                    : "border-base-300/30 bg-base-200/50 focus:ring-primary/50 focus:border-primary/50 focus:bg-base-100"
                }`}
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
              {errors.password && (
                <p className="text-xs text-red-600 mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {errors.server && (
              <p className="text-xs text-red-600 mt-1 ml-1">{errors.server}</p>
            )}

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
