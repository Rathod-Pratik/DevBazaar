import React, { useState } from "react";
import { useAppStore } from "../../Store";
import { Link } from "react-router-dom";
import { apiClient } from "../../lib/api-Client";
import { UPDATE_PROFILE } from "../../Utils/Constant";
import { toast } from "react-toastify";

const Account = () => {
  const { userInfo,setUserInfo } = useAppStore();
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const UpdateData = async () => {
    if(validataion()){
    if (newPassword !== confirmPassword) {
      return toast.error("New Password and Confirm Password Should be same");
    }
    try {
      const response = await apiClient.post(
        UPDATE_PROFILE,
        {
          email: userInfo.email,
          user: userInfo._id,
          address:address,
          Oldpassword: oldPassword,
          NewPassword: newPassword,
        },
        { withCredentials: true }
      );
      console.log(response.data.user);
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
    if(!address || userInfo.address){
      return false;
    }
    if(!oldPassword || !newPassword || !confirmPassword){
      return false;
    }
    return true;
  }
  return (
    <div className="min-h-[100vh] w-[98%] lg:w-[80%] mt-[40px] m-auto flex flex-col gap-10">
      <p data-aos="fade-left" className="flex justify-end gap-2 text-red-600">
        {" "}
        <span className="text-black">Welcome</span> {userInfo.FirstName}{" "}
        {userInfo.LastName}
      </p>
      <section className="flex flex-col-reverse justify-center lg:flex-row gap-10 min-h-[80vh] mt-10">
        {/* Links */}
        <div data-aos="fade-right" className="flex flex-col space-y-6 w-[25%] ">
          {/* Manage My Account Section */}
          <div>
            <h2 className="font-medium text-lg mb-2">Manage My Account</h2>
            <div className="flex flex-col space-y-2 text-gray-500">
              <Link to="/account" className="hover:text-gray-700">
                My Profile
              </Link>
              <Link to="/account" className="hover:text-gray-700">
                Address Book
              </Link>
              <Link to="/account" className="hover:text-gray-700">
                My Payment Options
              </Link>
            </div>
          </div>

          {/* My Orders Section */}
          <div>
            <h2 className="font-medium text-lg mb-2">My Orders</h2>
            <div className="flex flex-col space-y-2 text-gray-500">
              <Link to="/returns" className="hover:text-gray-700">
                My Returns
              </Link>
              <Link to="/cancellations" className="hover:text-gray-700">
                My Cancellations
              </Link>
            </div>
          </div>

          {/* Wishlist Section */}
          <Link
            to="/wishlist"
            className="font-medium text-lg hover:text-gray-700"
          >
            My Wishlist
          </Link>
        </div>

        {/* Update Account Details */}
        <div data-aos="fade-left" className="flex flex-col items-start ">
          <h2 className="text-red-600 text-xl font-semibold mb-4">
            Edit Your Profile
          </h2>
          <div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-6">
                <div>
                  <p className="text-black">First Name</p>
                  <input
                    value={userInfo.FirstName}
                    disabled
                    className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none text-gray-500"
                    type="text"
                  />
                </div>
                <div>
                  <p className="text-black">Last Name</p>
                  <input
                    value={userInfo.LastName}
                    disabled
                    className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none text-gray-500"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-6">
                <div>
                  <p className="text-black">Email</p>
                  <input
                  disabled
                    value={userInfo.email}
                    className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none text-gray-500"
                    type="text"
                  />
                </div>
                <div>
                  <p className="text-black">Address</p>
                  {userInfo.address && (
                    <input
                    disabled
                      value={userInfo.address}
                      className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none text-gray-500"
                      type="text"
                    />
                  )}
                  {!userInfo.address && (
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-[#F5F5F5] p-2 border-none w-[360px] outline-none text-gray-500"
                      type="text"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-black">Password Changes</p>
                <input
                  value={oldPassword}
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="bg-[#F5F5F5] p-2 border-none w-full outline-none text-gray-500"
                  type="text"
                />
                <input
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-[#F5F5F5] p-2 border-none w-full outline-none text-gray-500"
                  type="text"
                />
                <input
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#F5F5F5] p-2 border-none w-full outline-none text-gray-500"
                  type="text"
                />
              </div>
              <div className="justify-end flex">
                <button
                  className="bg-red-600 text-white p-2 w-[200px]"
                  onClick={UpdateData}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
