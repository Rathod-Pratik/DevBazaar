import React from "react";
import { PiHeadphonesThin } from "react-icons/pi";
import { FiCamera } from "react-icons/fi";
import { TbDeviceGamepad } from "react-icons/tb";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { LuWatch } from "react-icons/lu";
import { FiSmartphone } from "react-icons/fi";

const Categories = () => {
  const categories = [
    {
      name: "Phone",
      icon: <FiSmartphone />,
    },
    {
      name: "Computer",
      icon: <HiOutlineComputerDesktop />,
    },
    {
      name: "Watch",
      icon: <LuWatch />,
    },
    {
      name: "Camera",
      icon: <FiCamera />,
    },
    {
      name: "HeadPhone",
      icon: <PiHeadphonesThin />,
    },
    {
      name: "Gaming",
      icon: <TbDeviceGamepad />,
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-5 mx-3 my-3">
        <div className="flex flex-row gap-3 text-lg font-semibold text-red-600">
          <span className="bg-red-600 px-2 py-1 rounded">A</span>
          Categories
        </div>
        <div className="text-3xl font-medium">Browse By Category</div>
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-8">
        {categories.map((data, index) => (
          <div
            key={index}
            className="border-black hover:bg-[#DB4444] hover:text-white hover:border-none p-4 border-solid border-[1px] mx-3 my-2 w-[170px] h-[145px] gap-3 flex flex-col items-center justify-center transition-all duration-300"
          >
            <div className="text-4xl  hover:text-white">
              {data.icon}
            </div>
            <p>{data.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
