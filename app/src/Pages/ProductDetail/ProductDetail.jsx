import React, { useEffect, useState } from "react";
import { useAppStore } from "../../Store";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { ADD_TO_CART, ADD_TO_WISHLIST } from "../../Utils/Constant";
import ProductCard from "../../Component/Home/ProductCard";

const ProductDetail = () => {
    const [data, setData] = useState([]); // Initialize as an empty array

  const [quantity, setQuantity] = useState(1);
  const { ProductName } = useParams();
  const { productData, addCartItem, addWishListItem, userInfo } = useAppStore();

  //Filter Product
  // Find the product based on ProductName from params
  const product = productData?.find(
    (product) => product.Product_name === ProductName
  );

  if (!product) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        Product not found.
      </div>
    );
  }

  //Logi of star
  const maxStars = 5;
  const fullStars = Math.floor(product.Rating || 0); // Number of full stars
  const hasHalfStar = (product.Rating || 0) % 1 !== 0; // Check for a half-star
  const emptyStars = maxStars - Math.ceil(product.Rating || 0); // Remaining empty stars

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
      addCartItem(ProductItem);
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

  
  useEffect(() => {
    const limitedData = productData.slice(0, 5);
     setData(limitedData);
  }, []);

  return (
    <div className="min-h-[100vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 m-auto mt-10 lg:w-[80%]">
        {/* Left Section: Product Image */}
        <div data-aos="fade-right" className="lg:h-full lg:w-full h-[250px] flex lg:items-start items-center">
          <img
            src={product.product_image_url}
            alt={product.Product_name}
            className=" rounded-xl bg-contain bg-[#F5F5F5] mx-auto"
          />
        </div>

        {/* Right Section: Product Details */}
        <div data-aos="fade-left">
          <h1 className="text-2xl font-bold mb-4">{product.Product_name}</h1>
          <div className="flex items-center">
            {/* Full Stars */}
            {Array(fullStars)
              .fill(0)
              .map((_, index) => (
                <FaStar
                  key={`full-${index}`}
                  className="text-yellow-500"
                  aria-label="Full Star"
                />
              ))}

            {/* Half Star */}
            {hasHalfStar && (
              <FaStarHalfAlt
                className="text-yellow-500"
                aria-label="Half Star"
              />
            )}

            {/* Empty Stars */}
            {Array(emptyStars)
              .fill(0)
              .map((_, index) => (
                <FaRegStar
                  key={`empty-${index}`}
                  className="text-gray-300"
                  aria-label="Empty Star"
                />
              ))}

            {/* Show numeric product.Rating */}
            <p className="ml-2 text-sm text-gray-600">
              ({product.Rating || 0})
            </p>
          </div>
          <p className="text-lg font-semibold mt-4">
            Price:{" "}
            <span className="text-green-600">${product.Price || "N/A"}</span>
          </p>
          <p className="text-gray-700">
            {product.Description || "No description available."}
          </p>
          <div className="flex flex-row gap-4 mt-4">
            <div className="relative flex items-center max-w-[8rem] border-[1px] border-gray-300 rounded-lg mt-4">
              <button
                type="button"
                className="bg-red-500 outline-none rounded-s-lg px-3 py-1 text-white h-full border-[1px] border-gray-300"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <input
                type="text"
                id="quantity-input"
                className="bg-gray-50 border-x-0   text-center text-gray-500 text-sm  block w-full"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button
                type="button"
                id="increment-button"
                className="bg-red-500 outline-none rounded-s-lg px-3 py-1 text-white h-full border-[1px] border-gray-300"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={AddToCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Add to Cart
            </button>
            <div className="flex items-center mt-2">
              <FaRegHeart
                className="cursor-pointer m-2 text-[20px]"
                onClick={AddToWishList}
              />
            </div>
          </div>
          <div className="flex flex-col border-[1px] border-gray-400 mt-4 p-4 rounded-lg w-[360px] ">
            <div className="flex flex-row gap-3 py-4 border-b-gray-400 border-b-[1px]">
              <img src="/icon-delivery.png" alt="" />
              <div>
              <p>Free Delivery</p>
              <p  className="text-xs">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex flex-row gap-3 py-4">
              <img src="/Icon-return.png" alt="" />
              <div>
                <p>Return Delivery</p>
                <p className="text-xs">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-4 w-[90%] m-auto">
      <div data-aos="fade-right" className="flex flex-col  gap-5 mx-3 mb-[30px]">
        <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
          <span className="bg-red-600  px-2 rounded py-1">A</span>
         Our Products
        </div>
        <div className="text-3xl font-medium">Related Item</div>
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
    </div>
  );
};

export default ProductDetail;