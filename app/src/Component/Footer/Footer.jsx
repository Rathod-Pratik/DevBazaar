import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGooglePlay, FaApple } from "react-icons/fa";
const Footer = () => {
  return (
    

<footer className="p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
  {/* Footer Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
    {/* Exclusive Section */}
    <div>
      <h2 className="text-xl font-bold mb-4">Exclusive</h2>
      <p className="mb-2">Subscribe</p>
      <p className="text-sm mb-4">Get 10% off your first order by subscribing to our newsletter.</p>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 mb-4"
      />
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-semibold rounded transition">
        Subscribe
      </button>
    </div>

    {/* Support Section */}
    <div>
      <h2 className="text-xl font-bold mb-4">Support</h2>
      <p className="mb-2">111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh</p>
      <p className="mb-2">exclusive@gmail.com</p>
      <p>+88015-88888-9999</p>
    </div>

    {/* Account Section */}
    <div>
      <h2 className="text-xl font-bold mb-4">Account</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/account" className="hover:underline">My Account</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">Login / Register</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:underline">Cart</Link>
        </li>
        <li>
          <Link to="/shop" className="hover:underline">Shop</Link>
        </li>
      </ul>
    </div>

    {/* Quick Links Section */}
    <div>
      <h2 className="text-xl font-bold mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li>Privacy Policy</li>
        <li>Terms of Use</li>
        <li>FAQ</li>
        <li>Contact</li>
      </ul>
    </div>

    {/* Download App Section */}
    <div>
      <h2 className="text-xl font-bold mb-4">Download App</h2>
      <p className="mb-4">Save $3 with our App for new users only.</p>
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition">
          <FaGooglePlay className="mr-2" />
          Google Play
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition">
          <FaApple className="mr-2" />
          App Store
        </button>
      </div>
    </div>
  </div>

  {/* Footer Divider and Social Links */}
  <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col lg:flex-row items-center justify-between">
    {/* Social Media Icons */}
    <div className="flex space-x-4 mb-4 lg:mb-0">
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaFacebookF />
      </a>
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaTwitter />
      </a>
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaInstagram />
      </a>
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaLinkedinIn />
      </a>
    </div>

    {/* Footer Text */}
    <p className="text-sm text-gray-400">
      © 2025 Exclusive. All Rights Reserved.
    </p>
  </div>
</footer>

  );
};

export default Footer;
