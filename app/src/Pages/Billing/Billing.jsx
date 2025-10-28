import React, { useState } from "react";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";
import Payment from "../../Component/Payment/Payment";

const Billing = () => {
  const { cartItems } = useAppStore();
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    cartItems:cartItems
  });

  const validateCart = () => {
    if (!formData.firstName) {
      toast.error("First Name is required");
      return;
    }
    if (!formData.companyName) {
      toast.error("company Name is required");
      return;
    }
    if (!formData.streetAddress) {
      toast.error("Street Address is required");
      return;
    }
    if (!formData.townCity) {
      toast.error("City is required");
      return;
    }
    if (!formData.phoneNumber) {
      toast.error("Valid 10-digit Phone Number is required");
      return;
    }
    if (!formData.emailAddress) {
      toast.error("Valid Email Address is required");
      return;
    }
    
    return true;
  };
  let totalPrice = 0;

  if (cartItems && cartItems.length > 0) {
    for (const item of cartItems) {
      const price = Number(item.Price);
      const quantity = Number(item.quantity); // default to 1 if missing
      if (!isNaN(price)) {
        totalPrice += price * quantity;
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="min-h-[100vh] w-[98%] lg:w-[80%] mt-[40px] m-auto overflow-hidden">
      <h1
        data-aos="fade-down"
        className="text-[28px] lg:text-[36px] font-medium my-6 text-center lg:text-start"
      >
        Billing Details
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 lg:w-full  justify-center">
        {/* Left Section */}
        <div data-aos="fade-right" className="w-[70%] m-auto lg:w-full gap-4 flex flex-col"  >
          {[
            { label: "Name*", name: "firstName" },
            { label: "Company Name*", name: "companyName" },
            { label: "Street Address*", name: "streetAddress" },
            { label: "Apartment, floor, etc*", name: "apartment" },
            { label: "Town/City*", name: "townCity" },
            { label: "Phone Number*", name: "phoneNumber" },
            { label: "Email Address*", name: "emailAddress" },
          ].map((field, index) => (
            <div key={index}>
              <p className="text-gray-500">{field.label}</p>
              <input
                required={!field.label.includes("(optional)")}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2 border-none w-full outline-none rounded-md"
                type="text"
              />
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div data-aos="fade-left" className="flex flex-col gap-3 mt-6 w-[70%] m-auto lg:w-full">
          <div className="flex flex-col gap-6 w-full lg:w-[90%] justify-between mx-auto">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.Product_image}
                      className="h-[40px] w-[40px] object-cover"
                      alt={product.Product_name}
                    />
                    <p className="text-gray-500">{product.Product_name}</p>
                  </div>
                  <p>₹{product.Price}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )}
          </div>

          <div className="w-full lg:w-[90%] m-auto h-full flex flex-col gap-5 mt-6">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between px-2">
                <p className="text-[16px]">Subtotal:</p>
                <p>₹{totalPrice} </p>
              </div>
              <hr />
              <div className="flex justify-between px-2">
                <p className="text-[16px]">Shipping:</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="flex justify-between px-2">
                <p className="text-[16px]">Total:</p>
                <p>₹{totalPrice}</p>
              </div>
            </div>
            <Payment
              formData={formData}
              validateCart={validateCart}
              amount={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
