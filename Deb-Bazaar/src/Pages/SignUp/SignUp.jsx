import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {apiClient} from '../../lib/api-Client'
import { SIGNUP_ROUTES } from '../../Utils/Constant';
import { useAppStore } from '../../Store';
const SignUp = (props) => {
  const {setUserInfo}=useAppStore();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();
  const handleSignup=async()=>{
    props.setProgress(10);
   if(validateSignup()){
     try {
    const response=await apiClient.post(SIGNUP_ROUTES,{name,email,password},{withCredentials:true});
    const {data}=response;
    props.setProgress(50);
    if(response.status==201){
      props.ShowAlert('text-green-800','SignUp Successfully','bg-green-50');
      setUserInfo(data.user);
      navigate('/');
      props.setProgress(100);
    }
    } catch (error) {
      console.log(error);
      props.setProgress(100);
    }}
  }
  const validateSignup = () => {
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
  
    if (password.length < 8) {
      props.ShowAlert('text-red-800', "Password must be at least 8 characters long", 'bg-red-50');
      return false;
    }
  
    if (!name.length) {
      props.ShowAlert('text-red-800', "Name is required", 'bg-red-50');
      return false;
    }
  
    return true;
  };
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly w-4/5 mx-auto gap-8 py-12 md:py-16">
      {/* Image Section */}
      <div data-aos="fade-right" className="w-1/2 hidden md:flex items-center justify-center p-4">
        <img src="/Side Image.png" alt="Side visual illustration" className="max-w-full h-auto mx-auto" />
      </div>
      {/* Form Section */}
      <div data-aos="fade-left" className="flex flex-col gap-6 w-full md:w-1/3">
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
