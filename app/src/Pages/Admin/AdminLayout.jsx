import { Outlet } from "react-router-dom";
import Sidebar from "../../Component/SideBar/SideBar";
// import Sidebar from "../../Component/SideBar/SideBar";

const AdminLayout = () => {
    return (
      <div>
        <div className="grid grid-cols-12">
          <div  className="xl:col-span-2 hidden xl:block h-[90vh]">
            <Sidebar />
          </div>
          <div   className="xl:col-span-10 col-span-12 p-4">
            <div className="xl:hidden">
            <Sidebar />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      );
    };

export default AdminLayout
