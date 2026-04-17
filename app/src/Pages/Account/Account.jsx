import { useState } from "react";
import { useAppStore } from "../../Store";
import { Link, Navigate } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import { UPDATE_PROFILE } from "../../Utils/Constant";
import { toast } from "react-toastify";

const Account = () => {
  const { userInfo,setUserInfo } = useAppStore();
  const [mobileNumber, setMobileNumber] = useState(userInfo?.mobileNumber || "");
  const [address, setAddress] = useState(userInfo?.address || "");
  const [town, setTown] = useState(userInfo?.town || "");
  const [city, setCity] = useState(userInfo?.city || "");
  const [companyName, setCompanyName] = useState(userInfo?.companyName || "");

  const UpdateData = async () => {
    if(validataion()){
    try {
      const response = await apiClient.post(
        UPDATE_PROFILE,
        {
          email: userInfo.email,
          user: userInfo._id,
          mobileNumber,
          address,
          town,
          city,
          companyName,
        },
        { withCredentials: true },{timeout: 10000}
      );
      if (response.status == 200) {
        setUserInfo(response.data.user);
        toast.success("Profile Updated");
      } else {
        toast.error("Failed to update Profile");
      }
    } catch (error) {
      console.log(error);
    }
  }
  };

  const validataion=()=>{
    if(!mobileNumber){
      return false;
    }
    return true;
  }

  if (!userInfo) {
    toast.warning("Please login for access the account");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[100vh] w-full md:w-[90%] lg:w-[80%] mt-10 mx-auto flex flex-col gap-8 p-4">
  <p data-aos="fade-left" className="flex justify-center lg:justify-end gap-2 text-red-600 text-lg">
    <span className="text-black">Welcome</span> {userInfo.FirstName} {userInfo.LastName}
  </p>

  <section className="flex flex-col-reverse lg:flex-row gap-8 min-h-[80vh]">
    {/* Sidebar Links */}
    <div data-aos="fade-right" className="flex flex-col space-y-6 w-full md:w-[40%] lg:w-[25%]">
      <div>
        <h2 className="font-medium text-lg mb-2">Manage My Account</h2>
        <div className="flex flex-col space-y-2 text-gray-500">
          <Link to="/account" className="hover:text-gray-700">My Profile</Link>
          <Link to="/account" className="hover:text-gray-700">Address Book</Link>
          <Link to="/account" className="hover:text-gray-700">My Payment Options</Link>
        </div>
      </div>

      <div>
        <h2 className="font-medium text-lg mb-2">My Orders</h2>
        <div className="flex flex-col space-y-2 text-gray-500">
          <Link to="/cancelorder" className="hover:text-gray-700">My Cancellations</Link>
        </div>
      </div>

      <Link to="/wishlist" className="font-medium text-lg hover:text-gray-700">My Wishlist</Link>
    </div>

    {/* Profile Update Form */}
    <div data-aos="fade-left" className="flex flex-col w-full">
      <h2 className="text-red-600 text-xl font-semibold mb-4">Edit Your Profile</h2>

      <div className="flex flex-col gap-6">
        {/* Name Inputs */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <p className="text-black">First Name</p>
            <input
              value={userInfo.FirstName}
              disabled
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="text"
            />
          </div>
          <div className="w-full">
            <p className="text-black">Last Name</p>
            <input
              value={userInfo.LastName}
              disabled
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <p className="text-black">Email</p>
            <input
              disabled
              value={userInfo.email}
              autoComplete="email"
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="text"
            />
          </div>
          <div className="w-full">
            <p className="text-black">Mobile Number</p>
            <input
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              autoComplete="tel"
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="tel"
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <p className="text-black">Address</p>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="text"
              placeholder="Enter address"
            />
          </div>
          <div className="w-full">
            <p className="text-black">Town</p>
            <input
              value={town}
              onChange={(e) => setTown(e.target.value)}
              autoComplete="address-level3"
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="text"
              placeholder="Enter town"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <p className="text-black">City</p>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="address-level2"
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="text"
              placeholder="Enter city"
            />
          </div>
          <div className="w-full">
            <p className="text-black">Company Name</p>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              autoComplete="organization"
              className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
              type="text"
              placeholder="Enter company name"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center lg:justify-end">
          <button
            className="bg-red-600 text-white p-3 w-full md:w-[200px] rounded-md"
            onClick={UpdateData}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </section>
</div>

  );
};

export default Account;
