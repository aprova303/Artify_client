import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { updateProfile } from "firebase/auth";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const {isDark} = useTheme();
  const { createUser, signInWithGoogle, updateUser,setUser } = useAppContext();
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasMinLength = pwd.length >= 6;

    if (!hasMinLength) {
      return "Password must be at least 6 characters";
    }
    if (!hasUpperCase) {
      return "Password must contain an uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain a lowercase letter";
    }

    return "";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (pwd) {
      const error = validatePassword(pwd);
      setPasswordError(error);
    } else {
      setPasswordError("");
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !email || !photoURL || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      toast.error(pwdError);
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(email, password);

      if (result.user) {
        const user = result.user;
        toast.success("Account created successfully!");
        setName("");
        setEmail("");
        setPhotoURL("");
        setPassword("");
        setConfirmPassword("");
        navigate("/", { replace: true });
        updateUser({
           displayName: name,
        photoURL: photoURL,
        }).then(()=>{
          setUser({...user, displayName: name, photoURL: photoURL})
        }).catch(error=>{
          console.error("Error updating user profile:", error);
          setUser(user)
        })
      }
    } catch (error) {
      let errorMessage = "Failed to create account";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      }

      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        toast.success("Account created successfully with Google!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("Failed to sign up with Google");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
    // className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
     className={`min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="w-full max-w-md">
        <div className={` ${isDark ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl p-8`}>
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Create Account
            </h2>
            <p className={`text-gray-600 ${isDark ? "text-gray-300" : ""} mt-2`}>
              Join us and start sharing your art
            </p>
          </div>

          <form onSubmit={handleEmailRegister} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className={`block text-sm font-medium  ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={`w-full px-4 py-2 border ${isDark ?'border-gray-300 border-gray-600 bg-gray-700 dark:text-white' : 'bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium  ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              className={`w-full px-4 py-2 border ${isDark ?'border-gray-300 border-gray-600 bg-gray-700 dark:text-white' : 'bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                required
              />
            </div>

            {/* Photo URL Field */}
            <div>
              <label className={`block text-sm font-medium  ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Profile Photo URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                 className={`w-full px-4 py-2 border ${isDark ?'border-gray-300 border-gray-600 bg-gray-700 dark:text-white' : 'bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium  ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border ${isDark ?'border-gray-300 border-gray-600 bg-gray-700 dark:text-white' : 'bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-purple-500"
                }`}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Min 6 characters, must include uppercase and lowercase letters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block text-sm font-medium  ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border ${isDark ?'border-gray-300 border-gray-600 bg-gray-700 dark:text-white' : 'bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-purple-500"
                }`}
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading || !!passwordError}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-6"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              {/* <div className="w-full border-t border-gray-300 dark:border-gray-600"></div> */}
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2${isDark ? 'bg-gray-800  text-gray-400' : 'bg-white text-gray-500'}`}>
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 ${isDark ? ' bg-gray-700 hover:bg-gray-50 hover:bg-gray-600  text-gray-700 text-white' : 'bg-white text-gray-900'} font-semibold py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition duration-200`}
          >
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
          <p className={` ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
