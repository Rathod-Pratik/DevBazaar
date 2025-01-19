import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
const Hero = () => {

  return (
    <div className="">
      {/* Menu Section */}
      {/* <div className="col-span-1  justify-center gap-2 p-4 mt-4 border-r-2 hidden lg:flex">
        <nav className="space-y-4 text-[16px]">
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Women's Fashion
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Men's Fashion
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Electronics
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Home & Lifestyle
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Medicine
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Sports & Outdoor
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Baby's & Toys
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Groceries & Pets
          </Link>
          <Link className="block text-lg font-medium hover:underline hover:text-red-600">
            Health & Beauty
          </Link>
        </nav>
      </div> */}

      {/* Swiper Section */}
      <div className=" p-4">
              <div 
                className={`flex items-center justify-center flex-col-reverse md:flex-row p-2 rounded-lg shadow-md bg-black h-[550px] text-white`}
              >
                {/* Product Details */}
                <div className="md:w-1/2 text-left flex flex-col pl-2">
                  <h3 className="text-2xl font-bold mb-2">Iphone 14 Pro Max</h3>
                
                <p className="text-4xl lg:text-6xl">Upto 10% off Vaucher</p>

                  <button className="p-3 border border-transparent flex gap-2 justify-center my-2 mx-0 text-white hover:border hover:border-b-white w-[120px] transition-all duration-300">
                    Shop Now
                    <FaArrowRight className="self-center transition-all text-white " />
                  </button>
                </div>

                {/* Product Image */}
                <div className="flex justify-center">
                  <img
                    src='/public/hero.png'
                    alt='hero image'
                    className=" object-fill rounded-lg"
                  />
                </div>
              </div>
      </div>
    </div>
  );
};

export default Hero;
