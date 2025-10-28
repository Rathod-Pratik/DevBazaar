import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppStore } from "../../Store";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const BestSelling = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const {productData}=useAppStore();
  useEffect(() => {
    const remainingData = productData.slice(5, 10);
    setData(remainingData);
  }, []);

  return (
    <div className="p-3 sm:p-4 mt-4">
  <div  className="flex flex-col gap-4 sm:gap-5 mx-2 sm:mx-3 mb-[20px] sm:mb-[30px]">
    <div  className="flex flex-row justify-between items-center">
      {/* Left Section */}
      <div data-aos="fade-right" className="flex items-center gap-2 sm:gap-3 text-red-600 font-semibold text-base sm:text-lg">
        <span className="bg-red-600 px-2 py-1 rounded text-sm sm:text-base">A</span>
        This Month
      </div>

      {/* View All Button */}
      <div data-aos="fade-left" className="flex h-[40px] sm:h-[45px] items-center">
        <Link to={'/product'} className="bg-[#DB4444] hover:bg-[#E07575] text-white px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-none rounded-[5px]">
          View All
        </Link>
      </div>
    </div>

    {/* Title */}
    <div className="text-2xl sm:text-3xl font-medium">Best Selling Products</div>
  </div>

  {/* Product Cards Section */}
  {data.length ===0 ? (
        <div className="flex justify-center items-center h-[45vh]">
          <Loading/>
        </div> ):(
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {data.map((product, index) => (
      <div key={index} className="rounded-lg mb-4 sm:mb-6 mx-2 sm:mx-3 flex justify-center  sm:w-auto">
        <ProductCard data={product} />
      </div>
    ))}
  </div>
        )}
</div>

  );
};

export default BestSelling;
