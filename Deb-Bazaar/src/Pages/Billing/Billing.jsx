import React,{useState} from "react";
import { useAppStore } from "../../Store";
import { apiClient } from "../../lib/api-Client";
import { BILLING } from "../../Utils/Constant";
import { toast } from "react-toastify";

const Billing = () => {
  const { cartItems } = useAppStore();
    const [FirstName, setFirstName] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [StreetAddress, setStreetAddress] = useState("");
    const [Apartment, setApartment] = useState("");
    const [TownCity, setTownCity] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [EmailAddress, setEmailAddress] = useState("");


    const BillingFunction=async()=>{
        try {
            const response=await apiClient.post(BILLING,{
                Name: FirstName,
                company_name:CompanyName,
                address:StreetAddress,
                apartment: Apartment,
                city:TownCity,
                phoneNumber:PhoneNumber,
                email:EmailAddress,
                productData:cartItems
            },{withCredentials:true})

            if(response.status===201){
                toast.success("Billing Details Added");
                setFirstName("");
                setCompanyName("");
                setStreetAddress("");
                setApartment("");
                setTownCity("");
                setPhoneNumber("");
                setEmailAddress("");
            }else{
                toast.error("Failed to add Billing Details");
            }
        } catch (error) {
            console.log(error);
        }
    }

    let totalPrice = 0;

    for (const item of cartItems) {
      totalPrice += Number(item.Price); // Convert Price to a number
    }

  return (
    <div className="min-h-[100vh] w-[98%] lg:w-[80%] mt-[40px] m-auto">
      <h1 data-aos="fade-down" className="text-[36px] font-medium my-6">Billing Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div data-aos="fade-right" className="flex flex-col gap-6">
          <div>
            <p className="text-gray-500">First Name*</p>
            <input value={FirstName} onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none"
              type="text"
            />
          </div>
          <div>
            <p className="text-gray-500">Company Name</p>
            <input
            value={CompanyName} onChange={(e) => setCompanyName(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none"
              type="text"
            />
          </div>
          <div>
            <p className="text-gray-500">Street Address*</p>
            <input
            value={StreetAddress} onChange={(e) => setStreetAddress(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none"
              type="text"
            />
          </div>
          <div>
            <p className="text-gray-500">Apartment, floor, etc. (optional)</p>
            <input
            value={Apartment} onChange={(e) => setApartment(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none"
              type="text"
            />
          </div>
          <div>
            <p className="text-gray-500">Town/City*</p>
            <input
            value={TownCity} onChange={(e) => setTownCity(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none"
              type="text"
            />
          </div>
          <div>
            <p className="text-gray-500">Phone Number*</p>
            <input
            value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none"
              type="text"
            />
          </div>
          <div>
            <p className="text-gray-500">Email Address*</p>
            <input
            value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)}
              className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none"
              type="text"
            />
          </div>
        </div>
        <div data-aos="fade-left" className="flex flex-col gap-3 mt-6">
          <div class="flex flex-col gap-6 ">
            {cartItems.map((product, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.Product_image}
                        height={40}
                        width={40}
                        alt={product.Product_name}
                      />
                      <p className="text-gray-500">{product.Product_name}</p>
                    </div>
                    <p>${product.Price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[90%] m-auto h-full flex flex-col gap-5 mt-8 ">
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
            <div className="mt-6">
              <div className="flex justify-between gap-3 py-3">
                <div className="flex gap-2">
                  <input type="radio" name="PaymentMethod" />
                  Bank
                </div>
                <img src="/Frame 834.png" alt="" />
              </div>
              <div className="flex gap-2">
                <input type="radio" name="PaymentMethod" />
                Cash on delivery
              </div>
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                className="py-3 px-4 w-[60%] border-2 border-gray-500 outline-none rounded-[5px] h-[45px]"
              />
              <button className="py-3 px-4 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] text-[14px] h-[45px]">
                Apply Coupon
              </button>
            </div>
            <button onClick={BillingFunction} className="py-3 px-4 mb-3 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-[5px] h-[45px] w-[200px]">
            Place Order
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
