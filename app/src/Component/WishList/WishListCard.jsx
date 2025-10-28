import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { ADD_TO_CART, REMOVE_FROM_WISHLIST } from "../../Utils/Constant";
const WishListCard = ({ data }) => {
  const { userInfo, removeWishListItem, addCartItem } = useAppStore();
  const user = userInfo._id;
  const Product_name = data.Product_name;

  // Remove item from wishlist
  const RemoveFromWishList = async () => {
    try {
      const response = await apiClient.delete(
        `${REMOVE_FROM_WISHLIST}?user=${user}&Product_name=${Product_name}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        removeWishListItem(data);
        toast.success("Product removed from WishList");
      } else {
        toast.error("Product failed to remove from WishList");
      }
    } catch (error) {
      console.log("Error removing item from wishlist:", error);
    }
  };

  const AddToCart = async () => {
    try {
      const response = await apiClient.post(
        ADD_TO_CART,
        {
          Product_name: data.Product_name,
          Product_image: data.Product_image,
          user: userInfo._id,
          Price: data.Price,
          Original_Price: data.Original_Price,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {

        const CartItem={
          Product_name:data.Product_name,
          Product_image:data.Product_image,
          Price:data.Price,
        }

        addCartItem(CartItem);
        toast.success("Product added to cart");
      } else {
        toast.error("Product failed to add to cart");
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

  return (
    <div className="w-[280px] !border-none bg-white rounded-lg group">
      {/* Product Image */}
      <div className="bg-[#F5F5F5] ">
        <div className="flex flex-col relative">
          {/* Discount Badge and Wishlist Icon */}
          <div className="flex justify-between">
            <p className="px-3 py-1 m-2 rounded-[5px] bg-[#DB4444] text-white">
              -{data?.off}%
            </p>
            <RiDeleteBin6Line
              className="cursor-pointer m-2 text-[20px]"
              onClick={RemoveFromWishList}
            />
          </div>

          {/* Product Image */}
          <img
            className="m-auto w-[150px] h-[150px] object-contain rounded-lg"
            src={data?.Product_image}
            alt={data?.Product_name}
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
          <h1 className="text-[16px] font-medium text-gray-900 dark:text-white">
            {data?.Product_name}
          </h1>
          <div className="flex flex-row items-center gap-2">
            <p className="font-medium text-red-500 text-[16px]">
            ₹{data?.Price}
            </p>
            <p className="text-gray-500 line-through font-medium text-[16px]">
            ₹{data?.Original_Price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
