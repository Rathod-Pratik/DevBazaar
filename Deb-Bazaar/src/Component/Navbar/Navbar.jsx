import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white flex justify-between items-center px-8 py-4 shadow-md sticky top-0 z-50 ">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-gray-800">DavBazzar</h2>

      {/* Navigation Links */}
      <ul className="list-none gap-6 m-0 p-0 md:flex hidden">
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
        <li>
          <Link
            to="/signup"
            className="text-gray-800 active:border-b-gray-500 font-medium px-2 py-1 hover:bg-blue-500 hover:text-white rounded transition-all"
          >
            Sign up
          </Link>
        </li>
      </ul>

      {/* Search and Icons */}
      <div className="items-center gap-6 hidden md:flex">
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
    </header>
  );
};

export default Navbar;
