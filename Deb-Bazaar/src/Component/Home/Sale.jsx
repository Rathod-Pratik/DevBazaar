import React, { useEffect } from "react";
import { apiClient } from "../../lib/api-Client";
import { GET_PRODUCT_DATA } from "../../Utils/Constant";
import { useState } from "react";
import { toast } from "react-toastify";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
const Sale = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const FetchProductData = async () => {
      const response = await apiClient.get(GET_PRODUCT_DATA);
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error(
          "Some error occured while load product try again after some time"
        );
      }
    };
    FetchProductData();
  }, []);
  return (
    <div className="p-4">
      <div className="flex flex-col pl-5 gap-5">
        <div className="flex flex-row gap-3 text-lg font-semibold text-red-600">
          {" "}
          <div className="bg-red-600 text-red-600">A</div>Today's
        </div>
        <div className="text-3xl font-bold">Flash Sales</div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[]}
        className="mySwiper mt-4"
      >
        {Data?.map((data, index) => (
         <SwiperSlide
         key={index}
         className="border bg-white border-gray-300 !flex flex-col rounded-lg mb-6 transition-transform transform"
       >
         {/* Wishlist Heart */}
        <ProductCard data={data}/>
       </SwiperSlide>
       
       
        
        ))}
      </Swiper>
    </div>
    // </div>
  );
};

export default Sale;
