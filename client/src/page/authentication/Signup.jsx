import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaIdCard,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsernameThunk,
  signupUserThunk,
} from "../../store/slice/user.thunk";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allUsernames, setAllUsernames] = useState([]);

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllUsernameThunk())
      .unwrap()
      .then((usernames) => setAllUsernames(usernames))
      .catch(() => setAllUsernames([]));
    return () => setAllUsernames([]);
  }, [dispatch]);

  const validateAll = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full name is required";
    else if (!/^[A-Za-z\s]+$/.test(name.trim()))
      newErrors.name = "Full name can contain alphabets and spaces only";
    else if (name.trim().length < 2)
      newErrors.name = "Full name must be at least 2 characters";

    if (!username.trim()) newErrors.username = "Username is required";
    else if (!/^[A-Za-z_][A-Za-z0-9_]{2,29}$/.test(username.trim()))
      newErrors.username =
        "Username must start with a letter/underscore, 3–30 chars";
    else if (allUsernames.includes(username.trim()))
      newErrors.username = "Username already exists";

    if (!gender) newErrors.gender = "Please select your gender";

    if (!password) newErrors.password = "Password is required";
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password))
      newErrors.password =
        "Password must be 8+ chars with upper, lower & number";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsLoading(true);

    try {
      const resultAction = await dispatch(
        signupUserThunk({
          fullname: name.trim(),
          username: username.trim(),
          gender,
          password: password.trim(),
        })
      );

      if (signupUserThunk.fulfilled.match(resultAction)) {
        setName("");
        setUsername("");
        setGender("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        navigate("/login");
        toast.success("Account created successfully! Login now");
      } else {
        toast.error(resultAction.payload || "Signup failed");
      }
    } catch {
      toast.error("Account creation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!e.target.value.trim()) newErrors.name = "Full name is required";
      else if (!/^[A-Za-z\s]+$/.test(e.target.value.trim()))
        newErrors.name = "Full name can contain alphabets and spaces only";
      else if (e.target.value.trim().length < 2)
        newErrors.name = "Full name must be at least 2 characters";
      else delete newErrors.name;
      return newErrors;
    });
  };

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!val.trim()) newErrors.username = "Username is required";
      else if (!/^[A-Za-z_][A-Za-z0-9_]{2,29}$/.test(val.trim()))
        newErrors.username =
          "Username must start with a letter or underscore and be 3-30 chars long";
      else if (allUsernames.includes(val.trim()))
        newErrors.username = "Username already exists";
      else delete newErrors.username;
      return newErrors;
    });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!e.target.value) newErrors.gender = "Please select your gender";
      else delete newErrors.gender;
      return newErrors;
    });
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!val) newErrors.password = "Password is required";
      else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(val))
        newErrors.password =
          "Password must have 8+ chars with uppercase, lowercase & number";
      else delete newErrors.password;

      if (confirmPassword && val !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      else if (confirmPassword) delete newErrors.confirmPassword;

      return newErrors;
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!val) newErrors.confirmPassword = "Please confirm your password";
      else if (password !== val)
        newErrors.confirmPassword = "Passwords do not match";
      else delete newErrors.confirmPassword;
      return newErrors;
    });
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

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaIdCard className="text-sm text-base-content/40" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={handleNameChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm placeholder:text-base-content/40 focus:outline-none transition-all duration-200 ${
                  errors.name
                    ? "border-red-600 text-red-600 focus:ring-red-600 focus:border-red-600"
                    : "border-base-300/30 bg-base-200/50 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100"
                }`}
                disabled={isLoading}
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1 ml-1">{errors.name}</p>
              )}
            </div>

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
                    ? "border-red-600 text-red-600 focus:ring-red-500 focus:border-red-600"
                    : "border-base-300/30 bg-base-200/50 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100"
                }`}
                disabled={isLoading}
                autoComplete="username"
              />
              {errors.username && (
                <p className="text-xs text-red-600 mt-1 ml-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="flex gap-4 items-center justify-start px-2">
              <label
                className={`flex items-center gap-2 cursor-pointer ${
                  errors.gender ? "text-red-600" : "text-base-content/70"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                Male
              </label>
              <label
                className={`flex items-center gap-2 cursor-pointer ${
                  errors.gender ? "text-red-600" : "text-base-content/70"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-xs text-red-600 mt-1 ml-1">{errors.gender}</p>
            )}

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
                    : "border-base-300/30 bg-base-200/50 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100"
                }`}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-0 pr-3 text-sm text-base-content/40 hover:text-base-content transition-colors z-10"
                disabled={isLoading}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none z-10">
                <FaLock className="text-sm text-base-content/40" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm placeholder:text-base-content/40 focus:outline-none transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-red-600 text-red-600 focus:ring-red-600 focus:border-red-600"
                    : "border-base-300/30 bg-base-200/50 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-base-100"
                }`}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-3 right-0 pr-3 text-sm text-base-content/40 hover:text-base-content transition-colors z-10"
                disabled={isLoading}
                tabIndex={-1}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1 ml-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

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

            <a
              href="/login"
              className="w-full py-2.5 border border-secondary/20 hover:border-secondary/40 text-secondary font-medium rounded-lg transition-all duration-200 flex items-center justify-center hover:bg-secondary/5 text-sm"
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
