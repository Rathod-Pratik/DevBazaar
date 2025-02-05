import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { apiClient } from "../../lib/api-Client";
import { ADD_TO_CART, ADD_TO_WISHLIST } from "../../Utils/Constant";
import { useAppStore } from "../../Store/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const { userInfo, addWishListItem,addCartItem } = useAppStore();
  const {
    off,
    product_image_url,
    Product_name,
    Original_Price,
    Review,
    Price,
    Rating,
  } = data;
  const navigate = useNavigate();
  const AddToCart = async () => {

    if(!userInfo){
      navigate('/signup');
      return;
    }

    const response = await apiClient.post(
      ADD_TO_CART,
      {
        Product_name: Product_name,
        Product_image: product_image_url,
        user: userInfo._id,
        Price: Price,
        Original_Price: Original_Price,
      },
      { withCredentials: true }
    );

    if (response.status == 201) {
      const ProductItem = {
        Product_name: Product_name,
        Product_image: product_image_url,
        Price: Price,
        Original_Price: Original_Price,
        off: off,
      };
      addCartItem(ProductItem);
      toast.success("Product added to Cart");
    } else {
      toast.error("Product failed to add to Cart");
    }
  };

  
  const AddToWishList = async () => {

    if(!userInfo){
      navigate('/signup');
      return;
    }


    try {
      const response = await apiClient.post(
        ADD_TO_WISHLIST,
        {
          user: userInfo._id,
          Product_name: Product_name,
          Product_image: product_image_url,
          Price: Price,
          Original_Price: Original_Price,
          off: off,
        },
        { withCredentials: true }
      );
  
      if (response.status == 201) {
        const ProductItem = {
          Product_name: Product_name,
          Product_image: product_image_url,
          Price: Price,
          Original_Price: Original_Price,
          off: off,
        };
        addWishListItem(ProductItem);
        toast.success("Product added to WishList");
      }else {
        toast.error("Product failed to add to WishList");
      }
    } catch (error) {
      if (error.response) {
        // Check for specific status codes
        if (error.response.status === 409) {
          toast.error("Product already exists in the WishList");
        } else {
          toast.error("Failed to add product to WishList");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
   
  };

  const maxStars = 5;
  const fullStars = Math.floor(Rating); // Number of full stars
  const hasHalfStar = Rating % 1 !== 0; // Check if there's a half-star
  const emptyStars = maxStars - Math.ceil(Rating); // Remaining empty stars
  return (
    <div className="w-[280px] !border-none bg-white rounded-lg group" data-aos="zoom-in" >
      {/* Product Image */}
      <div className="bg-[#F5F5F5] ">
        <div className="flex flex-col relative">
          {/* Discount Badge and Wishlist Icon */}
          <div className="flex justify-between">
            <p className="px-3 py-1 m-2 rounded-[5px] bg-[#DB4444] text-white">
              -{off}%
            </p>
            <FaRegHeart
              className="cursor-pointer m-2 text-[20px]"
              onClick={AddToWishList}
            />
          </div>

          {/* Product Image */}
          <img
          onClick={()=>window.location.href=`/product/${Product_name}`}
            className="m-auto w-[150px] h-[150px] object-contain rounded-lg cursor-pointer"
            src={product_image_url}
            alt={Product_name}
          />

          {/* Add to Cart Button */}
          <button
            onClick={AddToCart}
            className="bg-black text-white h-[40px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* Product Details */}
      <div>
        <div className="flex flex-col gap-3 mt-1">
          <h1 className="text-[16px] font-medium text-gray-900 dark:text-white cursor-pointer" onClick={()=>window.location.href=`/product/${Product_name}`}>
            {Product_name}
          </h1>
          <div className="flex flex-row items-center gap-2">
            <p className="font-medium text-red-500 text-[16px]">${Price}</p>
            <p className="text-gray-500 line-through font-medium text-[16px]">
              ${Original_Price}
            </p>
          </div>
          <div className="flex items-center">
            {/* Full Stars */}
            {Array(fullStars)
              .fill(0)
              .map((_, index) => (
                <FaStar key={`full-${index}`} className="text-yellow-500" />
              ))}

            {/* Half Star */}
            {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}

            {/* Empty Stars */}
            {Array(emptyStars)
              .fill(0)
              .map((_, index) => (
                <FaRegStar key={`empty-${index}`} className="text-gray-300" />
              ))}

            {/* Show numeric rating */}
            <p className="ml-2 text-sm text-gray-600">({Review})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
