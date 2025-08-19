import React, { useState } from "react";
import { useAppStore } from "../../Store";
import { apiClient } from "../../lib/api-Client";
import { UPDATE_PROFILE } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate()
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
     if(!address || userInfo.address){
       return false;
     }
     if(!oldPassword || !newPassword || !confirmPassword){
       return false;
     }
     return true;
   }
   return (
     <div className="min-h-[100vh] w-full md:w-[90%] lg:w-[80%] mt-10 mx-auto flex flex-col gap-8 p-4">
   <section className="min-h-[80vh]">
     {/* Profile Update Form */}
     <div data-aos="zoom-in" className="flex flex-col w-full">
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
 
         {/* Email & Address */}
         <div className="flex flex-col md:flex-row gap-6">
           <div className="w-full">
             <p className="text-black">Email</p>
             <input
               disabled
               value={userInfo.email}
               className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
               type="text"
             />
           </div>
           <div className="w-full">
             <p className="text-black">Address</p>
             {userInfo.address ? (
               <input
                 disabled
                 value={userInfo.address}
                 className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
                 type="text"
               />
             ) : (
               <input
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
                 type="text"
               />
             )}
           </div>
         </div>
 
         {/* Password Inputs */}
         <div className="flex flex-col gap-6">
           <p className="text-black">Password Changes</p>
           <input
             value={oldPassword}
             placeholder="Old Password"
             onChange={(e) => setOldPassword(e.target.value)}
             className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
             type="password"
           />
           <input
             placeholder="New Password"
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
             className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
             type="password"
           />
           <input
             placeholder="Confirm Password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             className="bg-[#F5F5F5] p-3 border-none w-full outline-none text-gray-500"
             type="password"
           />
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
}

export default Profile
