import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { GET_PRODUCT_DATA } from "../../Utils/Constant";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";

const BestSelling = () => {
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(GET_PRODUCT_DATA);
        if (response.status === 200) {
          // Exclude the first 5 objects from the response data
          const remainingData = response.data.slice(5, 10);
          setData(remainingData);
        } else {
          toast.error(
            "An error occurred while loading products. Please try again later."
          );
        }
      } catch (error) {
        toast.error("Failed to fetch products. Check your connection.");
      }
    };
    fetchProductData();
  }, []);

  return (
    <div className="p-4 mt-4">
      <div className="flex flex-col  gap-5 mx-3 mb-[30px]">
        <div className="flex flex-row justify-between  ">
          <div className="flex items-center gap-3 text-red-600 font-semibold text-lg ">
            <span className="bg-red-600  px-2 rounded py-1">A</span>
            This Month
          </div>
          <div className="flex mt-3 h-[45px] items-center">
            <button className="bg-[#DB4444] hover:bg-[#E07575] text-white p-3 border-none rounded-[5px]">
              View All
            </button>
          </div>
        </div>
        <div className="text-3xl font-medium">Best Selling Products</div>
      </div>

      <div className="flex flex-wrap justify-center">
        {data.map((product, index) => (
          <div key={index} className="rounded-lg mb-6 mx-3">
            <ProductCard data={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
