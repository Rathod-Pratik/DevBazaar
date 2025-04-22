import React from "react";
import { useAppStore } from "../../Store";
import ProductCard from "../../Component/Home/ProductCard";

const Product = () => {
  const { productData } = useAppStore();
  return (
    <div>
      <div className="grid grid-cols-1 m-auto  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[90vw]  lg:mt-10">
        {productData &&
          productData.map((product, index) => (
            <div
              key={index}
              className="rounded-lg mb-6 mx-3 w-full md:max-w-[250px] flex justify-center lg:max-w-[300px]"
            >
              <ProductCard data={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
