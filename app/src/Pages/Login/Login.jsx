import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import { LOGIN_ROUTES } from "../../Utils/Constant";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";

const Login = () => {
  const {setUserInfo,setProgress}=useAppStore();
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const handleLogin = async () => {
    setProgress(30)
    if (!email) {
      toast.error("Email is required")
      return false;
    }
    
    if (!password) {
      toast.error("Password is required")
      return false;
    }
  
    try {
      setProgress(50)
      const response = await apiClient.post(
        LOGIN_ROUTES,
        { email, password },
        { withCredentials: true }
      );
  
      const { data, status } = response;
      if (status === 200) {
        if (data.user.role === 'admin') {
          setUserInfo(data.user)
          navigate('/admin');
        } else {
          setUserInfo(data.user);
          navigate('/');
        }
      }
    } catch (error) {
      const backendError = error.response?.data;
      
      // Handle specific error cases from backend
      if (backendError?.NotFound) {
        toast.error("Account not found. Please check your email");
      } 
      else if (backendError?.blocked) {
        toast.error("Your account has been blocked. Contact support");
      }
      else if (backendError?.WrongPassword) {
        toast.error("Incorrect password. Please try again");
      }
      else {
        // Network errors or server issues
        toast.error("Login failed. Please try again later");
        console.error("Login error:", error);
      }
    }finally{
      setProgress(100)
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly w-4/5 mx-auto gap-8 py-12 md:py-16">
      {/* Image Section */}
      <div data-aos="fade-right" className="w-1/2 hidden md:flex items-center justify-center p-4">
        <img src="/Side Image.png" alt="Side visual illustration" className="max-w-full h-auto mx-auto" />
      </div>
      {/* Form Section */}
      <div data-aos="fade-left" className="flex flex-col gap-7 w-full md:w-1/3">
        <div>
          <h2 className="text-2xl md:text-2xl font-semibold">Login Account</h2>
          <span className="text-gray-600">Enter your details below</span>
        </div>
        <form className="flex flex-col gap-4">
          <input
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="border-b border-gray-400 outline-none focus:border-red-600 transition duration-300 px-2 py-2"
          />
          <input
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            placeholder="Password"
            aria-label="Password"
            className="border-b border-gray-400 outline-none focus:border-red-600 transition duration-300 px-2 py-2"
          />
        </form>
        <div className="flex flex-row justify-between items-center">
          <button onClick={handleLogin} className="bg-red-600 text-white py-2 w-[130px] h-[45px] rounded-md transition duration-300 hover:bg-red-700 active:bg-red-800">
            Login
          </button>
          <div className="flex justify-center">
            <span className="text-gray-600 hover:border-b-gray-500">
              <Link to="/signup" className=" hover:text-gray-500 ">
                Forget Password
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
