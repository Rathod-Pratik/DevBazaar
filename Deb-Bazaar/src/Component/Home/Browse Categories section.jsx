import React from "react";
const Categories = () => {
  const Categories = [
    {
      name: "Phone",
      url: "/Category-CellPhone.svg",
    },
    {
      name: "Computer",
      url: "/Category-Computer.svg",
    },
    {
      name: "Watch",
      url: "/Category-SmartWatch.svg",
    },
    {
      name: "Camera",
      url: "/Category-Camera.svg",
    },
    {
      name: "HeadPhone",
      url: "/Category-Headphone.svg",
    },
    {
      name: "Gaming",
      url:'/Category-Gamepad.svg'
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-5 mx-3 my-3">
        <div className="flex flex-row gap-3 text-lg font-semibold text-red-600">
          <span className="bg-red-600  px-2 py-1 rounded">A</span>
          Categories
        </div>
        <div className="text-3xl font-medium">Browse By Category</div>
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-8">
        {Categories.map((data, index) => (
          <div key={index} className="border-black hover:bg-[#DB4444] hover:text-white hover:border-none p-4 border-solid border-[1px] mx-3 my-2 w-[170px] h-[145px] gap-3 flex flex-col items-center transition-all duration-300">
            <img src={data.url} className="hover:text-white"  alt={data.name} />
            <p>{data.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;