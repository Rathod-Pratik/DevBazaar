import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppStore } from "../../Store";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

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
  <div data-aos="fade-right" className="flex flex-col pl-1 gap-5 mx-3 mb-[30px]">
    <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
      <span className="bg-red-600 px-2 rounded py-1">A</span>
      Today's
    </div>
    <div className="text-2xl md:text-3xl lg:text-4xl font-medium">Flash Sales</div>
  </div>

  {/* Product Cards Section */}
  <div >
    {
      data.length ===0 ? (
        <div className="flex justify-center items-center h-[45vh]">
          <Loading/>
        </div>
      ): (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{data.map((product, index) => (
      <div
        key={index}
        className="rounded-lg mb-6 mx-3 flex justify-center md:max-w-[250px] lg:max-w-[300px] w-full"
      >
        <ProductCard data={product} />
      </div>
    ))}
        </div>
      )
    }
    
  </div>

  {/* View All Products Button */}
  <div className="flex justify-center mt-6">
    <Link to={'/product'} className="bg-[#DB4444] hover:bg-[#E07575] text-white px-6 py-3 rounded transition-all duration-300">
      View All Products
    </Link>
  </div>
</div>


  );
};

export default Sale;
