import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppStore } from "../../Store";

const Product = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
const {productData}=useAppStore();
  useEffect(() => {
    const limitedData = productData.slice(9, 19);
    setData(limitedData);
  }, []);

  return (
    <div className="p-4 mt-4">
      <div data-aos="fade-right" className="flex flex-col gap-5 mx-3 mb-[30px]">
        <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
          <span className="bg-red-600  px-2 rounded py-1">A</span>
         Our Products
        </div>
        <div className="text-3xl font-medium"> Explore Our Products</div>
      </div>

       <div className=" flex flex-wrap justify-center">
          {data.map((product,index) => (
            <div key={index} className="rounded-lg mb-6 mx-3">
              <ProductCard data={product} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-3">
          <button className="bg-[#DB4444] hover:bg-[#E07575] text-white p-3 border-none">View All Products</button>
        </div>
    </div>
  );
};

export default Product;
