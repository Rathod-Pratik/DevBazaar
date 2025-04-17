import React, { useEffect, useState } from "react";
import { useAppStore } from "../../Store";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { ADD_TO_CART, ADD_TO_WISHLIST, GET_REVIEW } from "../../Utils/Constant";
import ProductCard from "../../Component/Home/ProductCard";

const ProductDetail = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [review, setReviews] = useState();
  const { ProductName } = useParams();
  const { productData, addCartItem, addWishListItem, userInfo } = useAppStore();

  const product = productData?.find(
    (product) => product.Product_name === ProductName
  );
console.log(product)
  if (!product) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        Product not found.
      </div>
    );
  }

  //Logic of Add to cart
  const AddToCart = async () => {
    const response = await apiClient.post(
      ADD_TO_CART,
      {
        Product_name: product.Product_name,
        Product_image: product.product_image_url,
        user: userInfo._id,
        Price: product.Price,
        Original_Price: product.Original_Price,
        product:product._id
      },
      { withCredentials: true }
    );

    if (response.status == 201) {
      addCartItem(response.data.data);
      toast.success("Product added to Cart");
    } else {
      toast.error("Product failed to add to Cart");
    }
  };

  //Logic of Add to WishList
  const AddToWishList = async () => {
    try {
      const response = await apiClient.post(
        ADD_TO_WISHLIST,
        {
          user: userInfo._id,
          Product_name: product.Product_name,
          Product_image: product.product_image_url,
          Price: product.Price,
          Original_Price: product.Original_Price,
          off: product.off,
        },
        { withCredentials: true }
      );

      if (response.status == 201) {
        const ProductItem = {
          Product_name: product.Product_name,
          Product_image: product.product_image_url,
          Price: product.Price,
          Original_Price: product.Original_Price,
          off: product.off,
        };
        addWishListItem(ProductItem);
        toast.success("Product added to WishList");
      } else {
        toast.error("Product failed to add to WishList");
      }
    } catch (error) {
      if (error.response) {
        if (error.status === 409) {
          toast.error("Product already exists in the WishList");
        } else {
          toast.error("Failed to add product to WishList");
        }
      } else {
        console.error("Unexpected error:", error.response.status);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const FetchReview = async () => {
    try {
      const response = await apiClient.get(`${GET_REVIEW}/${product._id}`);
      if (response.status === 200) {
        setReviews(response.data.Review);
      }
    } catch (error) {
      toast.error("Failed to fetch Review")
    }
  };
  useEffect(() => {
    const limitedData = productData.slice(0, 5);
    setData(limitedData);
    FetchReview()
  }, []);

  return (
    <div className="min-h-[100vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
    {/* Product Image Section */}
    <div className="lg:w-1/2">
      <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-full">
        <img
          src={product.product_image_url}
          alt={product.Product_name}
          className="max-h-[400px] w-auto object-contain rounded-lg shadow-sm"
        />
      </div>
    </div>

    {/* Product Details Section */}
    <div className="lg:w-1/2">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {product.Product_name}
      </h1>
      
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-500 text-sm ml-2">(24 reviews)</span>
      </div>

      <p className="text-2xl font-semibold text-gray-900 mb-6">
        ${product.Price || "N/A"}
        {product.Original_Price && (
          <span className="text-lg text-gray-500 line-through ml-2">
            ${product.Original_Price}
          </span>
        )}
      </p>

      <p className="text-gray-700 mb-8 leading-relaxed">
        {product.Description || "No description available."}
      </p>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={AddToCart}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex-1 max-w-xs"
        >
          Add to Cart
        </button>
        <button
          onClick={AddToWishList}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Delivery Information */}
      <div className="space-y-4 border-t border-gray-200 pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Free Delivery</p>
            <p className="text-sm text-gray-500">
              Enter your postal code for Delivery Availability
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Free 30-Day Returns</p>
            <p className="text-sm text-gray-500">
              Easy return policy with no questions asked
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      <div className="p-4 mt-4 w-[90%] m-auto">
        <div
          data-aos="fade-right"
          className="flex flex-col  gap-5 mx-3 mb-[30px]"
        >
          <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
            <span className="bg-red-600  px-2 rounded py-1">A</span>
            Our Products
          </div>
          <div className="text-3xl font-medium">Related Item</div>
        </div>

        <div className=" flex flex-wrap justify-center">
          {data.map((product, index) => (
            <div key={index} className="rounded-lg mb-6 mx-3">
              <ProductCard data={product} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-3">
          <button className="bg-[#DB4444] hover:bg-[#E07575] text-white p-3 border-none">
            View All Products
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Review</h2>
      
      {typeof review === 'undefined' ? (
  <p className="text-gray-500">No review available.</p>
) : (
  review.map((rev, index) => (
    <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {rev.UserInfo.FirstName.charAt(0)}{rev.UserInfo.LastName.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">
              {rev.UserInfo.FirstName} {rev.UserInfo.LastName}
            </h3>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < rev.reviewStar ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div className="mt-4">
        <p className="text-gray-700">{rev.reviewText}</p>
      </div>
    </div>
  ))
)}

    </div>
    </div>
  );
};

export default ProductDetail;
