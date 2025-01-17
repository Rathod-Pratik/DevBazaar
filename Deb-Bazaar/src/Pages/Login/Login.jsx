import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import { LOGIN_ROUTES } from "../../Utils/Constant";
import { useAppStore } from "../../Store";

const Login = (props) => {
  const {setUserInfo}=useAppStore();
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const validateLogin = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
  
    if (!email.length) {
      props.ShowAlert('text-red-800', "Email is required", 'bg-red-50');
      return false;
    }
    
    if (!emailPattern.test(email)) {
      props.ShowAlert('text-red-800', "Please enter a valid email address", 'bg-red-50');
      return false;
    }
  
    if (!password.length) {
      props.ShowAlert('text-red-800', "Password is required", 'bg-red-50');
      return false;
    }
  
    return true;
  };
  
  const handleLogin=async()=>{
    props.setProgress(10);
    if(validateLogin()){
    try {
      const response=await apiClient.post(LOGIN_ROUTES,{email,password},{withCredentials:true});

      const {data,status}=response;
      props.setProgress(50);
      if(status==200){
        props.ShowAlert('text-green-800','Login Successfully','bg-green-50')
        setUserInfo(data.user);
        navigate('/');
        props.setProgress(100);
      }
    } catch (error) {
      console.log(error);
      props.ShowAlert('text-red-800','Please enter valid email and Password','bg-red-50');
      props.setProgress(100);
    }
  }
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly w-4/5 mx-auto gap-8 py-12 md:py-16">
      {/* Image Section */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-4">
        <img src="/Side Image.png" alt="Side visual illustration" className="max-w-full h-auto mx-auto" />
      </div>
      {/* Form Section */}
      <div className="flex flex-col gap-7 w-full md:w-1/3">
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
