import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaRegAddressBook, FaUser, FaBlog, FaStar, FaSignOutAlt } from "react-icons/fa";
import { IoLocationOutline, IoSettings } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../Store";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { LOGOUT } from "../../Utils/Constant";

function Sidebar() {
  const { userInfo, setUserInfo } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

   const Logout =async () => {
    try {
    const response =await apiClient.get(LOGOUT,{withCredentials:true})
    if(response.status==200){
      toast.success("Logout successfully")
      setUserInfo(undefined)
      navigate("/");
    }
  } catch (error) {
    toast.error("Server is Down")
      console.log(error)
  }
  };
  const navLinks = [
    { to: "/admin", icon: <FaHome />, label: "Dashboard" },
    { to: "/admin/category", icon: <IoLocationOutline />, label: "Categories" },
    { to: "/admin/product", icon: <FaRegAddressBook />, label: "Prducts" },
    { to: "/admin/order", icon: <IoSettings />, label: "Order" },
    { to: "/admin/user", icon: <FaUser />, label: "Users" },
    { to: "/admin/contact", icon: <FaMessage />, label: "Contacts" },
    { to: "/admin/review", icon: <FaStar />, label: "review" },
    { to: "/admin/profile", icon: <IoSettings />, label: "Profile" },
  ];



  return (
    <div>
      {/* Topbar toggle button for small screens */}
      <div className="flex items-center justify-between px-4 pt-4 pb-6 w-full xl:hidden">
        <button
          onClick={toggleSidebar}
          className="text-red-600 text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <p className="rounded-full text-[orange] px-4 py-2 md:hidden block">
          Welcome, {userInfo.FirstName} {userInfo.LastName}
        </p>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[71px] left-0 h-[calc(100vh-71px)] z-50 bg-white shadow-md transition-transform duration-300 xl:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
         w-[250px]`}
      >
        {/* Sidebar Links */}
        <div className="flex flex-col px-4 pt-6 text-base space-y-2 h-full">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={toggleSidebar} // close sidebar on link click
              className={`flex items-center gap-4 py-3 px-3 rounded-md transition-all duration-150 
                ${
                  location.pathname === item.to
                    ? "bg-[#ff0000] text-white "
                    : "text-gray-800"
                }
                hover:bg-[#ff1919] hover:text-white`}
            >
              <div
                className={`text-xl shrink-0 ${
                  location.pathname === item.to ? "text-white" : "text-orange-500"
                }`}
              >
                {item.icon}
              </div>
              <span className="whitespace-nowrap font-medium">
                {item.label}
              </span>
            </Link>
          ))}
          {/* Logout Button */}
          <button
            onClick={Logout}
            className="flex items-center gap-4 py-3 px-3 rounded-md transition-all duration-150 text-gray-800 hover:bg-[#ff1919] hover:text-white mt-4 bg-transparent outline-none border-none cursor-pointer"
            type="button"
          >
            <div className="text-xl shrink-0 text-orange-500 group-hover:text-white">
              <FaSignOutAlt />
            </div>
            <span className="whitespace-nowrap font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;