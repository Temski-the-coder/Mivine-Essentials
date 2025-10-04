import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";


const NavBar = () => {
  const {cart} = useSelector((state: RootState) => state.cart);
  const [openCart, setOpenCart] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.auth)

  const cartItemCount = cart?.products?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "login") navigate("/login");
    if (value === "register") navigate("/register");
    if (value === "profile") navigate("/profile");
    if (value === "admin") navigate("/admin");
  };

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const toggleCartDrawer = () => {
    setOpenCart(!openCart);
  };

  return (
    <>
      <nav className="max-w-full md:w-full flex mx-auto items-center justify-between px-2 md:px-6 py-3 md:py-4 border-b border-gray-700">
        <div>
          <Link to="/" className="text-md md:text-2xl logo">
            Mivine Essentials
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link
            to="/collections/all"
            className="text-gray-600 hover:text-black text-sm uppercase list"
          >
            All-Products
          </Link>

          <Link
            to="/collections/all?gender=Men"
            className="text-gray-600 hover:text-black text-sm uppercase list"
          >
            men
          </Link>

          <Link
            to="/collections/all?gender=Women"
            className="text-gray-600 hover:text-black text-sm uppercase list"
          >
            women
          </Link>

          <Link
            to="/collections/all?category=TopWear"
            className="text-gray-600 hover:text-black text-sm uppercase list"
          >
            Top Wears
          </Link>

          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-600 hover:text-black text-sm uppercase list"
          >
            Bottom Wears
          </Link>
        </div>
        {/* right side */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
            to="/admin"
            className="hidden bg-black px-3 py-1 md:flex gap-1 rounded-lg text-xs text-white hover:bg-blue-800 w-fit"
          >
            Admin <span>Panel</span>
          </Link>
          )}
          

          <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <label className="text-gray-500 hover:text-black">
              <FaRegCircleUser className="h-5 w-5" />
            </label>
            <select onChange={handleChange}>
              <option value="" disabled selected>Account</option>
              <option value="login">Login</option>
              <option value="register">Register</option>
              <option value="profile">Profile</option>
              <option value="admin" className="visible md:hidden">Admin Panel</option>
            </select>
          </div>

          <button
            onClick={toggleCartDrawer}
            className="relative text-gray-500 hover:text-black cursor"
          >
            <MdOutlineShoppingCartCheckout className="h-6 w-6 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1 py-0.3">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Searchbar */}
          <SearchBar />
          {/* Searchbar */}

          <button onClick={toggleMobileNav} className="md:hidden">
            <HiBars3 className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </nav>
      <CartDrawer
        openCart={openCart}
        toggleCartDrawer={toggleCartDrawer}
      />

      {/* mobile navbar */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          openMobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileNav}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl ">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all"
              onClick={toggleMobileNav}
              className="block text-gray-600 hover:text-blue-600"
            >
              All-Products
            </Link>

            <Link
              to="/collections/all?gender=Men"
              onClick={toggleMobileNav}
              className="block text-gray-600 hover:text-blue-600"
            >
              Men
            </Link>

            <Link
              to="/collections/all?gender=Women"
              onClick={toggleMobileNav}
              className="block text-gray-600 hover:text-blue-600"
            >
              Women
            </Link>

            <Link
              to="/collections/all?category=TopWear"
              onClick={toggleMobileNav}
              className="block text-gray-600 hover:text-blue-600"
            >
              Top Wears
            </Link>

            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleMobileNav}
              className="block text-gray-600 hover:text-blue-600"
            >
              Bottom Wears
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
