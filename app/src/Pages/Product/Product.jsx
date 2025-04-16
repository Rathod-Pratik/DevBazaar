import React from "react";
import { useAppStore } from "../../Store";
import ProductCard from "../../Component/Home/ProductCard";

const Product = () => {
  const { productData } = useAppStore();
  return (
    <div>
      <div className="min-h-[80vh] flex flex-wrap justify-center lg:mt-10">
        {productData &&
          productData.map((product, index) => (
            <div
              key={index}
              className="rounded-lg mb-6 mx-3 max-w-[300px] md:max-w-[250px] lg:max-w-[300px] w-full"
            >
              <ProductCard data={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
