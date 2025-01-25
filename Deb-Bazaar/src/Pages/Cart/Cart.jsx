import React from "react";
import { useAppStore } from "../../Store";
import CartItem from "../../Component/Cart/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useAppStore();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0 // Initial total is 0
  );

  return (
    <div className="mx-auto mt-12 w-[80%] min-h-[100vh] my-[30px] ">
      <div className="grid grid-cols-4 gap-4 text-gray-500 ">
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      <div className="min-h-[40vh] ">
        {cartItems.map((item) => (
          <div key={item.Product_name}>
            <CartItem data={item} />
          </div>
        ))}
      </div>

      <div className="my-6 flex justify-between">
        <button className="py-3 px-4 border-[1px] border-black hover:text-white hover:bg-red-500 transition-all duration-300 hover:border-none">
          Return to Shop
        </button>
        <button className="py-3 px-4  border-[1px]  border-black hover:text-white hover:bg-red-500 transition-all duration-300 hover:border-none">
          Update Cart
        </button>
      </div>

      <div className="flex flex-col w-full justify-between lg:flex-row gap-4">
        <div className="flex justify-between">
          <input
            type="text"
            className="py-3 px-4 w-[60%] border-2 border-gray-500 outline-none rounded-[5px] h-[45px]"
          />
          <button className="py-3 px-4 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] h-[45px]">
            Apply Coupon
          </button>
        </div>
        <div className="border-2 border-gray-500 lg:w-[35%] h-[265px] p-2">
          <p className="text-start p-2 font-medium text-[20px] ">Cart Total</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Subtotal:</p>
              <p>${totalPrice} </p>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Shipping:</p>
              <p>$0</p>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Total:</p>
              <p>${totalPrice}</p>
            </div>
            <hr />
          <Link to="/billing" className="py-3 px-4 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] h-[45px] w-[200px] m-auto">
          Procees to checkout
          </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Cart;
