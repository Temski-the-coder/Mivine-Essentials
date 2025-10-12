import { useEffect, useState } from "react";
import login from "../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Redux/Store";
import { mergeCarts } from "../Redux/Slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility
  const [showSuccess, setShowSuccess] = useState(false); // Success animation
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { cart } = useSelector((state: RootState) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Handle navigation after successful login
  useEffect(() => {
    if (user) {
      setShowSuccess(true);
      setTimeout(() => {
        if ((cart?.products?.length ?? 0) > 0 && guestId) {
          dispatch(mergeCarts({ guestId, user: user._id })).then(() => {
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          });
        } else {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        }
      }, 2000); // wait 2 seconds to show success animation
    }
  }, [user, navigate, isCheckoutRedirect, cart, guestId, dispatch]);

  // Auto-clear error after 3s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="flex flex-col items-center"
            >
              <FaRegCheckCircle  className="w-20 h-20 text-green-400 mb-4" />
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-semibold"
              >
                Login Successful!
              </motion.h2>
              <p className="text-gray-300 mt-2 text-sm">
                Redirecting to your dashboard...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative z-10"
        >
          <div className="flex justify-center mb-6">
            <h1 className="text-2xl font-bold tracking-wide logo text-gray-800">
              Mivine Essentials
            </h1>
          </div>

          <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
            Login to your account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your email and password
          </p>

          {/* Animated Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, -8, 8, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                  className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-center text-sm font-medium shadow-sm"
                >
                  {error === "Invalid Credentials"
                    ? "Invalid email or password. Please try again."
                    : error}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password with toggle */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FaRegEyeSlash size={20} strokeWidth={1.5} />
                ) : (
                  <FaRegEye size={20} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-3 text-white font-semibold rounded-lg shadow-md transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-black hover:bg-blue-600 active:scale-[0.98]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 bg-gray-100">
        <img
          src={login}
          alt="Login Illustration"
          className="object-cover h-full w-full rounded-l-2xl"
        />
      </div>
    </div>
  );
};

export default Login;
