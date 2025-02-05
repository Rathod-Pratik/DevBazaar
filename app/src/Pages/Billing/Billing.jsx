import React, { useState } from "react";
import { useAppStore } from "../../Store";
import { apiClient } from "../../lib/api-Client";
import { BILLING } from "../../Utils/Constant";
import { toast } from "react-toastify";

const Billing = () => {
  const { cartItems, userInfo, setCartItems} = useAppStore();
  const [FirstName, setFirstName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [StreetAddress, setStreetAddress] = useState("");
  const [Apartment, setApartment] = useState("");
  const [TownCity, setTownCity] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");

  const BillingFunction = async () => {
    try {
      const response = await apiClient.post(
        BILLING,
        {
          user: userInfo._id,
          Name: FirstName,
          company_name: CompanyName,
          address: StreetAddress,
          apartment: Apartment,
          city: TownCity,
          phoneNumber: PhoneNumber,
          email: EmailAddress,
          productData: cartItems,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setCartItems([]);
        toast.success("Billing Details Added");
        setFirstName("");
        setCompanyName("");
        setStreetAddress("");
        setApartment("");
        setTownCity("");
        setPhoneNumber("");
        setEmailAddress("");
      } else {
        toast.error("Failed to add Billing Details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let totalPrice = 0;

  if (Array.isArray(cartItems) && cartItems.length > 0) {
    totalPrice = cartItems.reduce((acc, item) => {
      const price = Number(item.Price);
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
  }

  return (
    <div className="min-h-[100vh] w-[98%] lg:w-[80%] mt-[40px] m-auto overflow-hidden">
    <h1 data-aos="fade-down" className="text-[28px] lg:text-[36px] font-medium my-6">
      Billing Details
    </h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Section */}
      <div data-aos="fade-right" className="flex flex-col gap-6">
        {[
          { label: "First Name*", value: FirstName, onChange: setFirstName },
          { label: "Company Name", value: CompanyName, onChange: setCompanyName },
          { label: "Street Address*", value: StreetAddress, onChange: setStreetAddress },
          { label: "Apartment, floor, etc. (optional)", value: Apartment, onChange: setApartment },
          { label: "Town/City*", value: TownCity, onChange: setTownCity },
          { label: "Phone Number*", value: PhoneNumber, onChange: setPhoneNumber },
          { label: "Email Address*", value: EmailAddress, onChange: setEmailAddress },
        ].map((field, index) => (
          <div key={index}>
            <p className="text-gray-500">{field.label}</p>
            <input
              required
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-full outline-none rounded-md"
              type="text"
            />
          </div>
        ))}
      </div>
  
      {/* Right Section */}
      <div data-aos="fade-left" className="flex flex-col gap-3 mt-6">
        <div className="flex flex-col gap-6">
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
                <p>${product.Price}</p>
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
              <p>${totalPrice} </p>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Shipping:</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <p className="text-[16px]">Total:</p>
              <p>${totalPrice}</p>
            </div>
          </div>
  
          {/* Payment Methods */}
          <div className="mt-6">
            <div className="flex justify-between gap-3 py-3">
              <div className="flex gap-2">
                <input required type="radio" name="PaymentMethod" />
                Bank
              </div>
              <img src="/Frame 834.png" className="w-[170px] h-auto object-contain" alt="Bank" />
            </div>
            <div className="flex gap-2">
              <input required type="radio" name="PaymentMethod" />
              Cash on delivery
            </div>
          </div>
  
          {/* Coupon & Order Button */}
          <div className="flex flex-col lg:flex-row justify-between gap-3">
            <input
              required
              type="text"
              className="py-3 px-4 w-full lg:w-[60%] border-2 border-gray-500 outline-none rounded-[5px] h-[45px]"
            />
            <button className="py-3 px-4 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] text-[14px] h-[45px]">
              Apply Coupon
            </button>
          </div>
  
          <button
            onClick={BillingFunction}
            className="py-3 px-4 mb-3 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] h-[45px] w-[200px] self-center"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Billing;
