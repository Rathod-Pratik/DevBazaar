import React from "react";

const New_Arrive = () => {
  return (
    <div className="p-4 mt-4">
      <div className="flex flex-col gap-4 mx-2 sm:mx-3 mb-6">
        <div className="flex flex-col gap-3 sm:gap-5 pl-3 lg:pl-20 mb-6">
          {/* Header Section */}
          <div data-aos="fade-right">
          <div className="flex flex-row gap-2 sm:gap-3 items-center text-red-600 font-semibold text-base sm:text-lg">
            <span className="bg-red-600 px-2 py-1 rounded">A</span>
            Today's
          </div>
          <div className="text-2xl sm:text-3xl font-medium">Flash Sales</div>
          </div>

          {/* Flash Sales Content */}
          <div data-aos="zoom-in" className="flex flex-col md:flex-row gap-3 h-auto md:h-[60vh] w-full">
            {/* Left Side */}
            <div className="bg-PS5 bg-black bg-center bg-no-repeat bg-contain text-start relative h-[250px] md:h-full flex-1">
              <div className="lg:absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-200">
                  PlayStation 5
                </h3>
                <p className="text-sm text-gray-300 mt-1 sm:mt-2">
                  Black and White version of the PS5 <br /> coming out on sale.
                </p>
                <button className="mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-4 sm:gap-5 flex-1">
              {/* Top Box */}
              <div className="bg-black bg-WomenCollection bg-no-repeat bg-cover bg-left h-[125px] md:h-1/2 relative">
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-200">
                    Women’s Collections
                  </h3>
                  <p className="text-sm text-gray-300 mt-1 sm:mt-2">
                    Featured woman collections that <br /> give you another
                    vibe.
                  </p>
                  <button className="mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Bottom Boxes */}
              <div className="flex gap-2 sm:gap-3 h-[125px] md:h-1/2">
                {/* Left Bottom Box */}
                <div className="bg-Speaker bg-black bg-contain bg-no-repeat bg-center w-1/2 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-semibold text-gray-200">
                      Speakers
                    </h3>
                    <p className="text-sm text-gray-300 mt-1 sm:mt-2">
                      Amazon wireless speakers
                    </p>
                    <button className="mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
                {/* Right Bottom Box */}
                <div className="bg-Perfume bg-black bg-contain bg-no-repeat bg-center w-1/2 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-semibold text-gray-200">
                      Perfume
                    </h3>
                    <p className="text-sm text-gray-300 mt-1 sm:mt-2">
                      Best Perfume ever
                    </p>
                    <button className="mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="flex flex-col sm:flex-row w-[90%] sm:w-[80%] m-auto gap-6 sm:gap-8 my-6 justify-between">
          {[
            {
              img: "/Services.png",
              title: "FREE AND FAST DELIVERY",
              desc: "Free delivery for all orders over $140",
            },
            {
              img: "/Services (1).png",
              title: "24/7 CUSTOMER SERVICE",
              desc: "Friendly 24/7 customer support",
            },
            {
              img: "/Services (2).png",
              title: "MONEY BACK GUARANTEE",
              desc: "We return money within 30 days",
            },
          ].map((service, idx) => (
            <div
            data-aos="zoom-out"
              key={idx}
              className="flex flex-col items-center gap-4 sm:gap-5 mx-3"
            >
              <img
                src={service.img}
                className="h-[40px] sm:h-[50px] w-[40px] sm:w-[50px]"
                alt={service.title}
              />
              <h2 className="text-center text-base sm:text-lg font-semibold">
                {service.title}
              </h2>
              <p className="text-center text-sm sm:text-base">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default New_Arrive;
