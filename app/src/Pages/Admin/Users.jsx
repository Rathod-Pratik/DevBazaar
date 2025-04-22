import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { GET_USER, DELETE_USER, BLOCK_USER, UNBLOCK_USER } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Users = () => {
  const [userData, SetUserData] = useState();
  const [FilterUserData, SetFilterUserData] = useState([]);
  const FetchUser = async () => {
    try {
      const response = await apiClient.get(GET_USER);
      if (response.status === 200) {
        SetFilterUserData(response.data.users);
        SetUserData(response.data.users);
      } else {
        toast.error("Failed to fetch user");
      }
    } catch (error) {
      toast.error("Some error occured try again after some time");
    }
  };
  useEffect(() => {
    FetchUser();
  }, []);
  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (lowerValue === "") {
      SetFilterUserData(userData);
    } else {
      const filtered = userData.filter((userData) =>
        userData.FirstName.toLowerCase().includes(lowerValue)
      );
      SetFilterUserData(filtered);
    }
  };

  const ConvertTime = (time) => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const DeleteUser = async (_id) => {
    try {
      const response = await apiClient.delete(`${DELETE_USER}/${_id}`);

      if (response.status === 200) {
        toast.success("User Deleted successfully");

        // Update the state optimistically
        SetFilterUserData((prevUsers) =>
          prevUsers.filter((user) => user._id !== _id)
        );
      } else {
        toast.error("Failed to delete User");
      }
    } catch (error) {
      // Handle errors, log them for debugging
      console.error("Error deleting contact:", error);
      toast.error("Some error occurred. Please try again later.");
    }
  };

  const BlockUser = async (_id) => {
    try {
      const response = await apiClient.post(`${BLOCK_USER}/${_id}`);

      if (response.status === 200) {
        toast.success("User blocked successfully");

        // Update the user's status in state
        SetFilterUserData((prevUsers) =>
          prevUsers.map((user) =>
            user._id === _id ? { ...user, status: "blocked" } : user
          )
        );
      } else {
        toast.error("Failed to block user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Some error occurred. Please try again later.");
    }
  };
  const UnblockUser = async (_id) => {
    try {
      const response = await apiClient.post(`${UNBLOCK_USER}/${_id}`);

      if (response.status === 200) {
        toast.success("User unblocked successfully");

        // Update the user's status in state
        SetFilterUserData(prevUsers =>
          prevUsers.map(user =>
            user._id === _id
              ? { ...user, status: 'active' }
              : user
          )
        );
      } else {
        toast.error("Failed to unblock user");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Some error occurred. Please try again later.");
    }
  };
  return (
    <div >
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-[orange] border-2 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Users"
        />
        <button className="text-white bg-[orange] px-5 cursor-pointer py-2 rounded-md">
          Search
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sr No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {typeof userData === "undefined" ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 8 }).map((__, i) => (
                    <td key={i} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : FilterUserData.length > 0 ? (
              // Actual data rows
              FilterUserData.map((data, index) => (
                <tr
                  key={data._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.FirstName} {data.LastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 ">
                    {data.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs break-words">
                    {data.address || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ConvertTime(data.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        data.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-3">
                    <button
                      onClick={() =>
                        data.status === "active" ? BlockUser(data._id) : UnblockUser(data._id)
                      }
                      className={`px-3 py-1 rounded-md text-xs ${
                        data.status === "active"
                          ? "bg-red-50 text-red-700 hover:bg-red-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {data.status === "active" ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => DeleteUser(data._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete User"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // No data found
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
