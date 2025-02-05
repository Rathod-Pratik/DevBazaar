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
    <>
    <div>
  {/* Table View for Large Screens */}
  <div className="hidden md:grid grid-cols-4 border-b py-4 items-center">
    <div className="flex items-center space-x-4">
      <img
        src={Product_image}
        alt={Product_name}
        className="w-12 h-12 object-cover rounded"
      />
      <p>{Product_name}</p>
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

  {/* Card View for Small Screens */}
  <div className="md:hidden border rounded-lg shadow-md p-4 flex flex-col space-y-4">
    <div className="flex items-center space-x-4">
      <img
        src={Product_image}
        alt={Product_name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div>
        <p className="text-lg font-semibold">{Product_name}</p>
        <p className="text-gray-600">${Price}</p>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <input
        type="number"
        min="1"
        defaultValue={1}
        value={Quentity}
        onChange={(e) => setQuntity(e.target.value)}
        className="border rounded w-16 text-center"
      />
      <button onClick={removeCartItems}>
        <MdDelete className="text-red-600 text-2xl" />
      </button>
    </div>
  </div>
</div>

    </>
  );
};

export default CartItem;
