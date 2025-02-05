import React, { useEffect, useState } from "react";
import { GET_PRODUCT_DATA } from "../../Utils/Constant";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import WishListCard from "../../Component/WishList/WishListCard";
import ProductCard from "../../Component/Home/ProductCard";

const WishList = () => {
 
 const { wishListItems } = useAppStore();

  const [data, setData] = useState([]);

  useEffect(() => {
    //Fetch Other Product Data
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(GET_PRODUCT_DATA);
        if (response.status === 200) {
          // Limit data to the first 6 objects
          const limitedData = response.data.slice(0, 5);
          setData(limitedData);
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
    <div className="mt-4 flex flex-col gap-10 my-5">
      <main className="flex flex-col">
        <div className="flex justify-between items-center w-[80%]  m-auto ">
          <p data-aos="fade-right">WishList ({wishListItems.length})</p>
          <button data-aos="fade-left" className="px-3 py-4 border-gray-600 border-2">
            Move All to Bag
          </button>
        </div>
        <div data-aos="fade-down" className="flex flex-wrap justify-center gap-5 m-auto my-6">
          {wishListItems.map((product) => (
            <WishListCard key={product._id} data={product} />
          ))}
        </div>
      </main>
      <section className="flex flex-col mt-5">
        <div className="flex justify-between items-center w-[80%]  m-auto ">
          <div data-aos="fade-right" className="flex flex-col gap-5 mx-3 mb-[30px]">
            <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
              <span className="bg-red-600  px-2 rounded py-1">A</span>
              Our Products
            </div>
            <div className="text-3xl font-medium">Just For You</div>
          </div>
          <button data-aos="fade-left" className="px-5 py-4 border-gray-600 border-2">
            See All
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-5 m-auto my-6">
          {data.map((product, index) => (
            <div key={index}>
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WishList;
