import React from "react";

const New_Arrive = () => {
  return (
    <div  className="flex flex-col gap-5 mx-3 mb-8">
    <div className="flex flex-col pl-3 lg:pl-20 gap-5 mx-3 mb-8">
  {/* Header Section */}
  <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
    <span className="bg-red-600 px-2 py-1 rounded">A</span>
    Today's
  </div>
  <div className="text-3xl font-medium">Flash Sales</div>

  {/* Flash Sales Content */}
  <div className="flex flex-col md:flex-row gap-3 h-auto md:h-[60vh] w-full md:w-[80vw]">
    {/* Left Side - Full-height Box */}
    <div className="bg-PS5 bg-black bg-center bg-no-repeat bg-contain text-start relative h-[300px] md:h-full flex-1">
      {/* Card Content */}
      <div className="md:absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-6">
        <h3 className="text-2xl font-semibold text-gray-200">
          PlayStation 5
        </h3>
        <p className="text-sm text-gray-300 mt-2">
          Black and White version of the PS5
          <br />
          coming out on sale.
        </p>
        <button className="mt-4 text-gray-300 hover:text-white border-b border-transparent hover:border-b-gray-300 px-3 py-1 transition-all duration-300">
          Shop Now
        </button>
      </div>
    </div>

    {/* Right Side - Nested Layout */}
    <div className="flex flex-col gap-5 flex-1">
      {/* Top Box on the Right */}
      <div className="bg-black bg-WomenCollection bg-no-repeat bg-cover bg-left h-[150px] md:h-1/2 relative">
        <div className="md:absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-6">
          <h3 className="text-2xl font-semibold text-gray-200">
            Women’s Collections
          </h3>
          <p className="text-sm text-gray-300 mt-2">
            Featured woman collections that
            <br />
            give you another vibe.
          </p>
          <button className="mt-4 text-gray-300 hover:text-white border-b border-transparent hover:border-b-gray-300 px-3 py-1 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Bottom Boxes on the Right */}
      <div className="flex gap-3 h-[150px] md:h-1/2">
        {/* Left Bottom Box */}
        <div className="bg-Speaker bg-black bg-contain bg-no-repeat bg-center w-1/2 relative">
          <div className="md:absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-6">
            <h3 className="text-2xl font-semibold text-gray-200">
              Speakers
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Amazon wireless speakers
            </p>
            <button className="mt-4 text-gray-300 hover:text-white border-b border-transparent hover:border-b-gray-300 px-3 py-1 transition-all duration-300">
              Shop Now
            </button>
          </div>
        </div>
        {/* Right Bottom Box */}
        <div className="bg-Perfume bg-black bg-contain bg-no-repeat bg-center w-1/2 relative">
          <div className="md:absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-6">
            <h3 className="text-2xl font-semibold text-gray-200">
              Perfume
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Best Perfume ever
            </p>
            <button className="mt-4 text-gray-300 hover:text-white border-b border-transparent hover:border-b-gray-300 px-3 py-1 transition-all duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="flex w-[80%] lg:flex-row flex-col m-auto my-8 justify-between">
  <div className="flex flex-col gap-5 mx-3 mb-8">
    <img src="/public/Services.png" className="h-[50px] w-[50px] m-auto" alt="" />
    <h2 className="text-[20px] font-semibold text-center">FREE AND FAST DELIVERY</h2>
    <p className="text-[14px] text-center">Free delivery for all orders over $140</p>
  </div>
  <div className="flex flex-col gap-5 mx-3 mb-8">
    <img src="/public/Services (1).png" className="h-[50px] w-[50px] m-auto" alt="" />
    <h2 className="text-[20px] font-semibold text-center">24/7 CUSTOMER SERVICE</h2>
    <p className="text-[14px] text-center">Friendly 24/7 customer support</p>
  </div>
  <div className="flex flex-col gap-5 mx-3 mb-8">
    <img src="/public/Services (2).png" className="h-[50px] w-[50px] m-auto " alt="" />
    <h2 className="text-[20px] font-semibold text-center">MONEY BACK GUARANTEE</h2>
    <p className="text-[14px] text-center">We reurn money within 30 days</p>
  </div>
</div>
</div>
  );
};

export default New_Arrive;
