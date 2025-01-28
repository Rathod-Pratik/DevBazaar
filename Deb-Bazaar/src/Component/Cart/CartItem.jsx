import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useAppStore } from "../../Store";
import { apiClient } from "../../lib/api-Client";
import { DELETE_FROM_CART } from "../../Utils/Constant";
import { toast } from "react-toastify";
const CartItem = ({ data }) => {
  const { Product_name, Price, quantity, Product_image } = data;
  const { Quentity, setQuntity } = useState(1);
  const { removeCartItem, userInfo } = useAppStore();


  const removeCartItems = async () => {
    try {
      const response = await apiClient.delete(
        `${DELETE_FROM_CART}?Product_name=${Product_name}&user=${userInfo._id}`
      );
      if (response.status === 200) {
        removeCartItem(data);
        toast.success("Product removed from the cart");
      } else {
        toast.error("Product failed to remove from Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="items-center grid grid-cols-4 border-b py-4">
      <div className="flex items-center space-x-4 relative">
        <img
          src={Product_image}
          alt={Product_name}
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <p>{Product_name}</p>
        </div>
      </div>

      <p className="text-gray-700">${Price}</p>
      <div>
        <input
          type="number"
          min="1"
          defaultValue={1}
          value={Quentity}
          onChange={(e) => setQuntity(e.target.value)}
          className="border rounded w-16 text-center"
        />
      </div>
      <p className="flex justify-between">
        ${Price}{" "}
        <button onClick={removeCartItems}>
          <MdDelete className="text-red-600 text-2xl" />
        </button>
      </p>
    </div>
  );
};

export default CartItem;
