import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useAppStore } from "../../Store";
import Cookies from "js-cookie";
import { LuUser } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { TiStarOutline } from "react-icons/ti";
import { BiLogOut } from "react-icons/bi";
const Navbar = () => {
  const isLoggedIn = () => {
    const jwt = Cookies.get("jwt"); // Get the JWT cookie
    return jwt !== undefined; // Returns true if the cookie exists
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { userInfo } = useAppStore();

  return (
    <>
      <header
        className={`bg-white flex justify-between items-center px-8 py-4 border-b sticky top-0 z-30 ${style.container}`}
      >
        {/* Logo */}
        <h2 className="text-2xl font-bold text-gray-800">DavBazzar</h2>

        {/* Navigation Links */}
        <ul
          className={`list-none gap-6 m-0 p-0 md:flex text-base hidden ${style.responsive}`}
        >
          <li>
            <Link
              to="/"
              className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
            >
              About
            </Link>
          </li>
          {!userInfo && isLoggedIn && (
            <li>
              <Link
                to="/signup"
                className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
              >
                Sign up
              </Link>
            </li>
          )}
        </ul>

        {/* Search and Icons */}
        <div
          className={`items-center gap-6 flex justify-end ${style.searchbar}`}
        >
          {/* Search Box */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-1 bg-gray-100">
            <input
              type="search"
              placeholder="What are you looking for?"
              className="border-none outline-none text-sm bg-gray-100 w-48"
            />
            <IoIosSearch className="text-gray-600 text-xl ml-2 cursor-pointer" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <MdOutlineShoppingCart className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition-all" />
            <FaRegHeart className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition-all" />
            {userInfo && (
              <LuUser
                className="text-white rounded-full text-2xl bg-red-600 p-1 cursor-pointer transition-all"
                onClick={toggleModal}
              />
            )}
          </div>
        </div>

        <nav className={`hidden relative  ${style.sidebar}`}>
          {/* Toggle Button */}
          <div className={`hidden relative  ${style.sidebar} `}>
            <IoMenu
              className="text-black text-[35px] cursor-pointer"
              onClick={toggleMenu}
            />
          </div>

          {/* Sliding Menu for small screen */}
          <div
            className={`fixed top-0 right-0 w-full h-full bg-white shadow-md z-50 py-4 px-6 transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close Button */}
            <div className="items-center gap-6 flex justify-end">
              <IoMenu
                className="text-black text-[35px] cursor-pointer"
                onClick={toggleMenu}
              />
            </div>

            {/* Menu Items */}
            <ul className={`list-none gap-6 m-0 p-0 flex flex-col text-center`}>
              <li>
                <Link
                  to="/"
                  className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              {!userInfo && (
                <li>
                  <Link
                    to="/signup"
                    className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </li>
              )}
              <div className="items-center gap-6 flex flex-col">
                {/* Search Box */}
                <div className="flex items-center border border-gray-300 rounded px-3 py-1 bg-gray-100">
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    className="border-none outline-none text-sm bg-gray-100 w-48"
                  />
                  <IoIosSearch className="text-gray-600 text-xl ml-2 cursor-pointer" />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                  <MdOutlineShoppingCart className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition-all" />
                  <FaRegHeart className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition-all" />
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </header>
      {openModal && (
        <div className="absolute right-[45px] top-12 bg-transparent backdrop-blur-sm shadow-lg rounded-md p-4 w-48 z-50">
          <ul className="list-none">
            <li className="py-2">
              <Link
                to="/account"
                className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
              >
                <LuUser />
                Manage My Account
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/cart"
                className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
              >
                <FiShoppingBag />
                My Orders
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/account"
                className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
              >
                <MdOutlineCancel />
                My Cancellations
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/account"
                className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
              >
                <TiStarOutline />
                My Reviews
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/account"
                className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
              >
                <BiLogOut />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
