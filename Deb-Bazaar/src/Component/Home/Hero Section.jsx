import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { FaArrowRight } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
const Hero = () => {
  return (
    <div className=" mt-4 rounded-md">
    <div className="h-[650px] flex items-center justify-evenly flex-col-reverse md:flex-row p-2 rounded-[10px] shadow-md bg-black text-white">
      {/* Product Details */}
      <div className="text-center md:text-left gap-4">
      <h3 className="font-bold mb-2 text-white flex flex-row gap-3 items-center"><FaApple className="text-4xl" /> <p className="text-2xl">Iphone 14 Pro Max</p></h3>
        <p className="text-4xl lg:text-7xl">Up to 10%</p>
        <p className="text-4xl lg:text-7xl">off Voucher</p>
        <button
          className="p-3 border border-transparent m-auto lg:m-[0px] flex gap-2 justify-center my-2 text-white hover:border hover:border-b-white w-[130px] transition-all duration-300"
          aria-label="Shop Now"
        >
          Shop Now
          <FaArrowRight className="self-center text-white transition-all" />
        </button>
      </div>
      <div className="flex justify-center">
        <img
          src="/hero.png"
          alt="Hero image showcasing product discount"
          className="object-fill rounded-lg"
        />
      </div>
    </div>
  </div>
  
  );
};

export default Hero;
