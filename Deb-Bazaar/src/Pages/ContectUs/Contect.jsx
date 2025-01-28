import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { SEND_MESSAGE } from "../../Utils/Constant";

const Contect = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const SendMessage=async()=>{
    if(validataion()){
      try {
        const response=await apiClient.post(SEND_MESSAGE,{name,email,number,message});

        if(response.status===200){
          toast.success("Message send Successfully");
          setEmail("");
          setName("");
          setMessage("");
          setNumber("");
        }
        else{
          toast.error("Error while sending message try again after some time")
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const validataion=()=>{
    if(name.length<0){
      toast.error("Name is required");
      return false;
    }
    if(email.length<0){
      toast.error("Email is required");
      return false;
    }
    if(number.length<0){
      toast.error('Mobile number is required');
      return false;
    }
    if(message.length<0){
      toast.error("Message is required");
    }
    return true;
  }
  return (
    <>
      <h2 data-aos="fade-down" className="text-center mt-10 text-3xl font-semibold">Contect Us</h2>

      <div className="min-h-[100vh] mt-5 flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start gap-8 p-6 lg:p-12">
        <div data-aos="fade-right" className="space-y-8 max-w-[400px]">
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <img src="/icons-phone.png" alt="" className="w-6 h-6" />
              <span className="font-semibold text-lg">Call To Us</span>
            </p>
            <p>We are available 24/7, 7 days a week.</p>
            <p className="font-medium text-gray-600">Phone: +9016561625</p>
          </div>
          <hr />
          {/* Write To Us Section */}
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <img src="/icons-mail.png" alt="" className="w-6 h-6" />
              <span className="font-semibold text-lg">Write To Us</span>
            </p>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p className="font-medium text-gray-600">
              Emails: customer@exclusive.com
            </p>
            <p className="font-medium text-gray-600">
              Emails: support@exclusive.com
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div data-aos="fade-left" className="space-y-6 w-full max-w-[600px]">
          {/* Input Fields */}
          <div className="flex flex-wrap gap-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-full lg:w-[calc(50%-8px)] outline-none text-gray-500"
              type="text"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-full lg:w-[calc(50%-8px)] outline-none text-gray-500"
              type="text"
            />
            <input
              placeholder="Mobile number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-full lg:w-[calc(50%-8px)] outline-none text-gray-500"
              type="text"
            />
          </div>
          {/* Message Textarea */}
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#F5F5F5] p-2 border-none w-full outline-none text-gray-500 h-[150px] resize-none"
          ></textarea>
          <div className=" flex justify-end">
            <button onClick={SendMessage} className="bg-red-600 text-white p-2 w-[200px]">
              Send Massage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contect;
