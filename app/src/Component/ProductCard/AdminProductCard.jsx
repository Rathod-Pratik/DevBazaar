import React from 'react'

const AdminProductCard = () => {
  return (
    <div className="w-[280px] !border-none bg-white rounded-lg group relative" data-aos="zoom-in">
    {/* Admin Actions (Edit/Delete) - Only show if user is admin */}
    {isAdmin && (
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(_id);
          }}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          title="Edit"
        >
          <FiEdit className="text-blue-600" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(_id);
          }}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          title="Delete"
        >
          <FiTrash2 className="text-red-600" />
        </button>
      </div>
    )}
  
    {/* Product Image */}
    <div className="bg-[#F5F5F5]">
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
          onClick={() => window.location.href=`/product/${Product_name}`}
          className="m-auto w-[150px] h-[150px] object-contain rounded-lg cursor-pointer"
          src={product_image_url}
          alt={Product_name}
        />
  
        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            AddToCart(_id);
          }}
          className="bg-black text-white h-[40px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
    
    {/* Product Details */}
    <div>
      <div className="flex flex-col gap-3 mt-1">
        <h1 
          className="text-[16px] font-medium text-gray-900 dark:text-white cursor-pointer" 
          onClick={() => window.location.href=`/product/${Product_name}`}
        >
          {Product_name}
        </h1>
        <div className="flex flex-row items-center gap-2">
          <p className="font-medium text-red-500 text-[16px]">${Price}</p>
          <p className="text-gray-500 line-through font-medium text-[16px]">
            ${Original_Price}
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminProductCard
