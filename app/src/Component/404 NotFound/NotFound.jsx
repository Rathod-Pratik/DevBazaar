import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center text-center space-y-6">
  {/* 404 Message */}
  <div className="flex flex-col gap-3">

  <p className="text-8xl font-medium text-black">404 Not Found</p>
  
  {/* Description */}
  <p className="text-lg text-gray-600">
    The page you visited was not found. You may go back to the home page.
  </p>
  </div>
  {/* Back to Home Button */}
  <Link 
    to="/" 
    className="bg-red-600 text-white py-2 px-6 rounded-md text-lg font-medium hover:bg-red-700 transition">
    Back to Home Page
  </Link>
</div>

  );
};

export default NotFound;
