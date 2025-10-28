import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { DELETE_REVIEW, GET_ALL_REVIEW } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { IoStar } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useAppStore } from "../../Store";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate=useNavigate()
  const [Review, SetReview] = useState();
  const { productData } = useAppStore();

  // Delete a review
  const DeleteReview = async (_id) => {
    try {
      const response = await apiClient.delete(`${DELETE_REVIEW}/${_id}`,{
        withCredentials:true
      });

      if (response.status === 200) {
        toast.success("Review removed successfully");

        // Update state to remove the deleted review
        SetReview((prevReviews) =>
          prevReviews.filter((review) => !(review._id === _id))
        );
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  // Fetch all reviews
  const fetchReview = async () => {
    try {
      const response = await apiClient.get(GET_ALL_REVIEW,{
        withCredentials:true
      });
      if (response.status === 200) {
        SetReview(response.data.Review);
      }
    } catch (error) {
      toast.error("Some error occurred. Try again later.");
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  // Get initial character for user badge
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  // Format time
  const ConvertTime = (time) => {
    const date = new Date(time);
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Find product image URL by product ID
  const findProductById = (id) => {
    const product = productData.find((product) => product._id === id);
    console.log(product);
    return product
      ? product.product_image_url
      : "https://via.placeholder.com/400x300?text=No+Image";
  };
  const findProductNameById = (id) => {
    const product = productData.find((product) => product._id === id);
    console.log(product);
    return product ? product.Product_name : "";
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Review
        ? Review.map((review, index) => (
            <div key={index}>
              <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                {/* Image */}
                <div className="relative h-56 flex justify-center m-2.5 overflow-hidden text-white rounded-md">
                  <img
                    src={findProductById(review.Productid)}
                    alt="product"
                    className="w-[50%] h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(review.reviewStar)].map((_, i) => (
                      <IoStar key={i} className="text-[orange] text-lg" />
                    ))}
                  </div>
                  <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                    {findProductNameById(review.Productid)}
                  </h6>
                  <p className="text-slate-600 leading-normal font-light">
                    {review.reviewText}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center text-white font-bold bg-[orange] rounded-full">
                      {getInitial(review.UserInfo.FirstName)}
                    </div>
                    <div className="flex flex-col ml-3 text-sm">
                      <span className="text-slate-800 font-semibold">
                        {review.UserInfo.FirstName} {review.UserInfo.LastName}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <MdDelete
                      onClick={() => DeleteReview(review._id)}
                      className="text-[orange] cursor-pointer text-2xl hover:text-orange-400 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        : // Skeleton Loader
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 animate-pulse"
            >
              <div className="relative h-56 m-2.5 bg-gray-200 rounded-md"></div>
              <div className="p-4 space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 w-5 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col ml-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Reviews;
