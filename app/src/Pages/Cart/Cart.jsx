import React from "react";
import { useAppStore } from "../../Store";
import CartItem from "../../Component/Cart/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useAppStore();

  let totalPrice = 0;
  if (cartItems && cartItems.length > 0) {
    for (const item of cartItems) {
      const price = Number(item.Price);
      const quantity = Number(item.quantity || 1); // default to 1 if missing
      if (!isNaN(price)) {
        totalPrice += price * quantity;
      }
    }
  }

  return (
    <div className="mx-auto mt-12 w-[80%] min-h-[100vh] my-[30px]">
      <div data-aos="fade-down" className="hidden lg:grid grid-cols-4 gap-4 text-gray-500">
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>

      <div className="min-h-[40vh]" data-aos="fade-down">
  {cartItems && cartItems.length > 0 ? (
    cartItems.map((item) => (
      <div key={item.Product_name}>
        <CartItem data={item} />
      </div>
    ))
  ) : (
    <div className="text-center text-gray-500 text-lg mt-10">
      Your cart is empty. <Link to="/" className="text-red-500">Go shopping!</Link>
    </div>
  )}
</div>

      <div className="my-6 flex justify-between">
        <button
          data-aos="fade-right"
          className="py-3 px-4 border-[1px] border-black hover:text-white hover:bg-red-500 transition-all duration-300 hover:border-none"
        >
          Return to Shop
        </button>
        <button
          data-aos="fade-left"
          className="py-3 px-4 border-[1px] border-black hover:text-white hover:bg-red-500 transition-all duration-300 hover:border-none"
        >
          Update Cart
        </button>
      </div>

      <div className="flex flex-col w-full justify-between lg:flex-row gap-4">
        <div data-aos="fade-right" className="flex justify-between">
          <input
            type="text"
            className="py-3 px-4 w-[60%] border-2 border-gray-500 outline-none rounded-[5px] h-[45px]"
          />
          <button className="py-3 px-4 text-[12px] lg:text-[16px] text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] h-[45px]">
            Apply Coupon
          </button>
        </div>
        <div data-aos="fade-left" className="border-2 border-gray-500 lg:w-[35%] h-[265px] p-2">
          <p className="text-start p-2 font-medium text-[20px]">Cart Total</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Subtotal:</p>
              <p>₹{totalPrice} </p>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Shipping:</p>
              <p>₹0</p>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Total:</p>
              <p>₹{totalPrice}</p>
            </div>
            <hr />
            <Link
              to="/billing"
              className="py-3 px-4 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] h-[45px] w-[200px] m-auto"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
