import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {apiClient} from '../../lib/api-Client'
import { SIGNUP_ROUTES } from '../../Utils/Constant';
import { useAppStore } from '../../Store';
const SignUp = () => {
  const {setUserInfo}=useAppStore();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();
  const handleSignup=async()=>{
   if(validateSignup()){
     try {
    const response=await apiClient.post(SIGNUP_ROUTES,{name,email,password},{withCredentials:true});
    console.log(response);
    if(response.status==201){
      navigate('/')
      setUserInfo(response.data.user)
    }
    } catch (error) {
      console.log(error)
    }}
  }
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (!name.length) {
      toast.error("Password and confirm password should be the same.");
      return false;
    }
    return true;
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly w-4/5 mx-auto gap-8 py-12 md:py-16">
      {/* Image Section */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-4">
        <img src="/Side Image.png" alt="Side visual illustration" className="max-w-full h-auto mx-auto" />
      </div>
      {/* Form Section */}
      <div className="flex flex-col gap-6 w-full md:w-1/3">
        <div>
          <h2 className="text-2xl md:text-2xl font-semibold">Create an Account</h2>
          <span className="text-gray-600">Enter your details below</span>
        </div>
        <form className="flex flex-col gap-4">
          <input
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
            type="text"
            placeholder="Name"
            aria-label="Name"
            className="border-b border-gray-400 outline-none focus:border-red-600 transition duration-300 px-2 py-2"
          />
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
        <div>
          <button onClick={handleSignup} className="w-full bg-red-600 text-white py-2 rounded-md transition duration-300 hover:bg-red-700 active:bg-red-800">
            Create Account
          </button>
          <div className="flex justify-center mt-4">
            <span className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp
