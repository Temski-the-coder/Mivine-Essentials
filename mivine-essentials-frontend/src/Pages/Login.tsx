import { useEffect, useState } from "react";
import login from "../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Redux/Store";
import { mergeCarts } from "../Redux/Slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { cart } = useSelector((state: RootState) => state.cart);

  // Redirect handling
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Handle auto-navigation after successful login
  useEffect(() => {
    if (user) {
      if ((cart?.products?.length ?? 0) > 0 && guestId) {
        dispatch(mergeCarts({ guestId, user: user._id })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, navigate, isCheckoutRedirect, cart, guestId, dispatch]);

  // Auto-clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
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
            Enter your email and password below
          </p>

          {/*Animated error message*/}
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

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your password"
            />
          </div>

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