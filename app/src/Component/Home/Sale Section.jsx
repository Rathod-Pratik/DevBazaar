import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppStore } from "../../Store";

const Sale = () => {
  const {productData}=useAppStore();
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const limitedData = productData.slice(0, 5);
     setData(limitedData);

  }, []);

  return (
<div className="p-4 mt-4">
  {/* Header Section */}
  <div data-aos="fade-right" className="flex flex-col pl-1 lg:pl-20 gap-5 mx-3 mb-[30px]">
    <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
      <span className="bg-red-600 px-2 rounded py-1">A</span>
      Today's
    </div>
    <div className="text-2xl md:text-3xl lg:text-4xl font-medium">Flash Sales</div>
  </div>

  {/* Product Cards Section */}
  <div className="flex flex-wrap justify-center gap-6">
    {data.map((product, index) => (
      <div
        key={index}
        className="rounded-lg mb-6 mx-3 max-w-[300px] md:max-w-[250px] lg:max-w-[300px] w-full"
      >
        <ProductCard data={product} />
      </div>
    ))}
  </div>

  {/* View All Products Button */}
  <div className="flex justify-center mt-6">
    <button className="bg-[#DB4444] hover:bg-[#E07575] text-white px-6 py-3 rounded transition-all duration-300">
      View All Products
    </button>
  </div>
</div>


  );
};

export default Sale;
