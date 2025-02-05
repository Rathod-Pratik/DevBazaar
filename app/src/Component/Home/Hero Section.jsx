import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { FaArrowRight } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
const Hero = () => {
  return (
    <div className="mt-4 rounded-md">
    <div className="lg:min-h-[70vh] flex flex-col-reverse md:flex-row items-center justify-evenly p-4 md:p-6 lg:p-8 rounded-[10px] shadow-md bg-black text-white">
      {/* Product Details */}
      <div data-aos="fade-right" className="text-center md:text-left gap-4 flex flex-col items-center md:items-start">
        <h3 className="font-bold mb-4 text-white flex flex-row gap-3 items-center">
          <FaApple className="text-4xl" />
          <p className="text-2xl md:text-3xl lg:text-4xl">Iphone 14 Pro Max</p>
        </h3>
        <p className="text-2xl md:text-4xl lg:text-6xl">Up to 10%</p>
        <p className="text-2xl md:text-4xl lg:text-6xl">off Voucher</p>
        <button
          className="p-3 border border-transparent flex gap-2 justify-center text-white hover:border hover:border-b-white w-[130px] transition-all duration-300"
          aria-label="Shop Now"
        >
          Shop Now
          <FaArrowRight className="self-center text-white transition-all" />
        </button>
      </div>
      {/* Product Image */}
      <div className="flex justify-center" data-aos="fade-left">
        <img
          src="/hero.png"
          alt="Hero image showcasing product discount"
          className="object-cover rounded-lg w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </div>
    </div>
  </div>
  
  
  );
};

export default Hero;
