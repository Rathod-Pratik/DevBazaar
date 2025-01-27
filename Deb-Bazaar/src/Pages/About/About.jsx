import React from "react";

const About = () => {
  return (
    <div className="min-h-[100vh] mt-10 flex flex-col gap-10">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="flex justify-center items-center ">
          <div className=" lg:w-[70%]">
            <h2 className="font-semibold text-[54px] px-8 my-5 ">Our Story</h2>
            <p className="px-8 my-5">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p className="px-8 my-5 ">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
        </div>
        <div className="flex lg:justify-end justify-center w-full">
          <img src="/public/About Image.png" alt="" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-[90%] mx-auto mt-10">
        {/* Card 1 */}
        <div className="border-[1px] border-gray-400 flex flex-col items-center p-4 text-center rounded-[6px] shadow-md w-[20%] h-[210px] justify-center cursor-pointer">
          <img
            src="/public/About Services-1.png"
            alt="Sellers Active"
            className="w-16 h-16 mb-2"
          />
          <p className="text-xl font-semibold">10.5k</p>
          <p className="text-gray-600">Sellers active on our site</p>
        </div>

        {/* Card 2 */}
        <div className="bg-red-500 rounded-[6px] text-white flex flex-col items-center p-4 text-center shadow-md w-[20%] h-[210px] justify-center cursor-pointer">
          <img
            src="/public/About Services-2.png"
            alt="Monthly Product Sale"
            className="w-16 h-16 mb-2"
          />
          <p className="text-xl font-semibold">33k</p>
          <p>Monthly Product Sale</p>
        </div>

        {/* Card 3 */}
        <div className=" border-[1px] border-gray-400  rounded-[6px]  flex flex-col items-center p-4 text-center shadow-md w-[20%] h-[210px] justify-center cursor-pointer">
          <img
            src="/public/About Services-3.png"
            alt="Customer Active"
            className="w-16 h-16 mb-2"
          />
          <p className="text-xl font-semibold">45.5k</p>
          <p className="text-gray-600">Customers active on our site</p>
        </div>

        {/* Card 4 */}
        <div className="border-[1px] border-gray-400  rounded-[6px] flex flex-col items-center p-4 text-center shadow-md w-[20%] h-[210px] justify-center cursor-pointer">
          <img
            src="/public/About Services-4.png"
            alt="Annual Gross Sale"
            className="w-16 h-16 mb-2"
          />
          <p className="text-xl font-semibold">25k</p>
          <p className="text-gray-600">Annual gross sale on our site</p>
        </div>
      </div>

      <div className="w-[90%] mx-auto my-10">
        {/* Section Heading */}
        <h2 className="text-3xl font-semibold text-center mb-10">Our Team</h2>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center border p-6 rounded-lg shadow-md">
            <img
              src="/public/Frame 874.png"
              alt="Tom Cruise"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <p className="text-xl font-medium">Tom Cruise</p>
            <p className="text-gray-500">Founder & Chairman</p>
            {/* Social Media Links */}
            <div className="flex gap-4 mt-4">
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.16-3.37-1.16-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.26-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03A9.54 9.54 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 20h-3v-10h3v10zm-1.5-11.45c-1 0-1.8-.8-1.8-1.8 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8zm13.5 11.45h-3v-5.4c0-1.29-.03-2.94-1.79-2.94s-2.07 1.4-2.07 2.84v5.5h-3v-10h2.88v1.36h.04c.4-.77 1.36-1.58 2.8-1.58 2.99 0 3.54 1.97 3.54 4.53v5.69z" />
                </svg>
              </a>
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.723c-.951.555-2.005.96-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482c-4.088-.205-7.719-2.164-10.15-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.71.869 3.213 2.188 4.095a4.903 4.903 0 0 1-2.228-.616v.061a4.922 4.922 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.934 4.934 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.951 13.951 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646a9.936 9.936 0 0 0 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Repeat for Team Members 2 and 3 with their details */}
          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center border p-6 rounded-lg shadow-md">
            <img
              src="/public/Frame 875.png"
              alt="Emma Watson"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <p className="text-xl font-medium">Emma Watson</p>
            <p className="text-gray-500">Managing Director</p>
            <div className="flex gap-4 mt-4">
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.16-3.37-1.16-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.26-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03A9.54 9.54 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 20h-3v-10h3v10zm-1.5-11.45c-1 0-1.8-.8-1.8-1.8 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8zm13.5 11.45h-3v-5.4c0-1.29-.03-2.94-1.79-2.94s-2.07 1.4-2.07 2.84v5.5h-3v-10h2.88v1.36h.04c.4-.77 1.36-1.58 2.8-1.58 2.99 0 3.54 1.97 3.54 4.53v5.69z" />
                </svg>
              </a>
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.723c-.951.555-2.005.96-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482c-4.088-.205-7.719-2.164-10.15-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.71.869 3.213 2.188 4.095a4.903 4.903 0 0 1-2.228-.616v.061a4.922 4.922 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.934 4.934 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.951 13.951 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646a9.936 9.936 0 0 0 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center text-center border p-6 rounded-lg shadow-md">
            <img
              src="/public/Frame 876.png"
              alt="Will Smith"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <p className="text-xl font-medium">Will Smith</p>
            <p className="text-gray-500">Product Designer</p>
            <div className="flex gap-4 mt-4">
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.16-3.37-1.16-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.26-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03A9.54 9.54 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 20h-3v-10h3v10zm-1.5-11.45c-1 0-1.8-.8-1.8-1.8 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8zm13.5 11.45h-3v-5.4c0-1.29-.03-2.94-1.79-2.94s-2.07 1.4-2.07 2.84v5.5h-3v-10h2.88v1.36h.04c.4-.77 1.36-1.58 2.8-1.58 2.99 0 3.54 1.97 3.54 4.53v5.69z" />
                </svg>
              </a>
              <a rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.723c-.951.555-2.005.96-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482c-4.088-.205-7.719-2.164-10.15-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.71.869 3.213 2.188 4.095a4.903 4.903 0 0 1-2.228-.616v.061a4.922 4.922 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.934 4.934 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.951 13.951 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646a9.936 9.936 0 0 0 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[80%] lg:flex-row flex-col m-auto my-8 justify-evenly">
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

export default About;
