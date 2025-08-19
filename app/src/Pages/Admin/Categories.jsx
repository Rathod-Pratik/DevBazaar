import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
  UPDATE_CATEGORY,
} from "../../Utils/Constant";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [description, SetDescription] = useState();
  const [iconName, SeticonName] = useState();
  const [categories, setCategories] = useState();
  const [FilterCategoriesData, SetFilterCategoriesData] = useState([]);

  const [model, setShowModel] = useState(false);
  const ShowModel = () => {
    setShowModel(!model);
  };
  const createCategory = async () => {
    try {
      const response = await apiClient.post(
        CREATE_CATEGORY,
        {
          name,
          description,
          iconName
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const newCategory = response.data.data;

        SetFilterCategoriesData((prev) => [...prev, newCategory]);
        setName("");
        SetDescription("");
        toast.success("Category created successfully");
        setShowModel(false);
      } else {
        toast.error("Failed to create category. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Some error occurred, try again after some time.");
      console.error("Create category error:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await apiClient.get(GET_CATEGORY);
      if (response.status === 200) {
        setCategories(response.data.data);
        SetFilterCategoriesData(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to Fetch category");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // htmlFormat date htmlFor display
  const htmlFormatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Handle delete category
  const handleDelete = async (categoryId) => {
    try {
      const response = await apiClient.delete(
        `${DELETE_CATEGORY}/${categoryId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Category deleted successfully");
        SetFilterCategoriesData((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
      } else {
        // Handle non-200 status codes
        toast.error(response.data?.message || "Failed to delete category");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("Delete category error:", error);

      // Show appropriate error message
      if (error.response) {
        // Server responded with error status
        toast.error(
          error.response.data?.message || "Failed to delete category"
        );
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error - please check your connection");
      } else {
        // Other errors
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Handle edit category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  // Handle save edited category
  const updatecategory = async (_id) => {
    try {
      const response = await apiClient.post(
        UPDATE_CATEGORY,
        {
          iconName,
          name,
          description,
          _id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Categary Updated successfully");
        const updatedCategory = response.data.update;
        SetFilterReviewData((prevCategories) =>
          prevCategories.map((category) =>
            category._id === _id
              ? response.data.update
              : category
          )
        );
      }
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to update categoty");
    }
  };
  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (lowerValue === "") {
      SetFilterCategoriesData(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(lowerValue)
      );
      SetFilterCategoriesData(filtered);
    }
  };
  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-[orange] border-2 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Categories"
        />
        <button
          onClick={ShowModel}
          className="text-white bg-[orange] px-5 cursor-pointer py-2 rounded-md"
        >
          new
        </button>
      </div>
      <div>
        {model && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add New Category
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={ShowModel}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="category-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      id="category-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="category-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Icon name
                    </label>
                    <input
                      value={iconName}
                      onChange={(e) => SeticonName(e.target.value)}
                      type="text"
                      id="Icon-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter category name"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="category-description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => SetDescription(e.target.value)}
                      id="category-description"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter category description"
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={ShowModel}
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createCategory}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {FilterCategoriesData &&
                FilterCategoriesData.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs break-words">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {htmlFormatDate(category.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Edit Category
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div>
                  <div className="mb-4">
                    <label
                      htmlhtmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={editingCategory?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlhtmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Icon name
                    </label>
                    <input
                      type="text"
                      id="iconName"
                      name="iconName"
                      onChange={(e) => SeticonName(e.target.value)}
                      defaultValue={editingCategory?.iconName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlhtmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      onChange={(e) => SetDescription(e.target.value)}
                      defaultValue={editingCategory?.description}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditingCategory(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updatecategory(editingCategory?._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
