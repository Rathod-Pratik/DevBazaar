import { useAppStore } from "../../Store";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CATEGORY,
  UPDATE_PRODUCT,
} from "../../Utils/Constant";
import { apiClient } from "../../lib/api-Client";
import { toast } from "react-toastify";

const Products = () => {
  const { productData, setproductData } = useAppStore();
  const [FilterProductData, SetFilterProductData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, SetLoading] = useState();
  const [editData, setEditData] = useState({
    Product_name: "",
    Price: "",
    Original_Price: "",
    Description: "",
    category: "",
    off: "",
  });
  const [Categories, setCategories] = useState([]);
  const [SelectFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    SetFilterProductData(productData);
  }, [productData]);

  const fetchCategory = async () => {
    try {
      const response = await apiClient.get(GET_CATEGORY);
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to Fetch category");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (lowerValue === "") {
      SetFilterProductData(productData);
    } else {
      const filtered = productData.filter((product) =>
        product.Product_name.toLowerCase().includes(lowerValue)
      );
      SetFilterProductData(filtered);
    }
  };

  const handleCreate = async () => {
    if (
      !editData.Product_name ||
      !editData.Price ||
      !editData.Description ||
      !editData.category ||
      !SelectFile
    ) {
      toast.error("All Fields are required");
      return;
    }
    SetLoading(true);
    const formData = new FormData();
    formData.append("Product_name", editData.Product_name);
    formData.append("off", editData.off);
    formData.append("Price", editData.Price);
    formData.append("Original_Price", editData.Original_Price);
    formData.append("Description", editData.Description);
    formData.append("category", editData.category);
    if (SelectFile) {
      formData.append("product_image", SelectFile);
    }

    try {
      const response = await apiClient.post(CREATE_PRODUCT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Product Added successfully");
        const newProduct = response.data.data;
        setproductData((prev) => [...prev, newProduct]);
        setShowModal(false);
        setEditData({
          Product_name: "",
          Price: "",
          Original_Price: "",
          Description: "",
          category: "",
          off: "",
        });
        setSelectedFile(null);
        setPreview("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    } finally {
      SetLoading(false);
    }
  };

  const handleUpdate = async (_id) => {
    try {
      SetLoading(true);
      const formData = new FormData();
      formData.append("Product_name", editData.Product_name);
      formData.append("off", editData.off);
      formData.append("Price", editData.Price);
      formData.append("Original_Price", editData.Original_Price);
      formData.append("Description", editData.Description);
      formData.append("category", editData.category);
      formData.append("_id", editData._id);

      if (SelectFile) {
        formData.append("product_image", SelectFile);
      }
      const response = await apiClient.put(
        `${UPDATE_PRODUCT}/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Product Updated successfully");
        setproductData((prev) =>
          prev.map((product) =>
            product._id === editData._id ? response.data.data : product
          )
        );
      }
      setShowModal(false);
      setEditData({
        Product_name: "",
        Price: "",
        Original_Price: "",
        Description: "",
        category: "",
        off: "",
      });
      setSelectedFile(null);
      setPreview("");
    } catch (error) {
      toast.error("some error occured try again after some time");
    } finally {
      SetLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handledelete = async (_id, Product_name, category) => {
    try {
      SetLoading(true);
      const response = await apiClient.post(`${DELETE_PRODUCT}/${_id}`, {
        Product_name,
        category,
      });

      if (response.status === 200) {
        toast.success("Product Deleted successfully");
        setproductData((prevdata) =>
          prevdata.filter((data) => data._id !== _id)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occured try again after sometime");
    } finally {
      SetLoading(false);
    }
  };
  const openEditModal = (product) => {
    setEditData(product);
    setPreview(product.product_image_url || "");
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-[orange] border-2 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Contacts"
        />
        <button
          onClick={() => {
            setEditData({
              Product_name: "",
              Price: "",
              Original_Price: "",
              Description: "",
              category: "",
              off: "",
            });
            setPreview("");
            setSelectedFile(null);
            setShowModal(true);
          }}
          className="text-white bg-[orange] px-5 cursor-pointer py-2 rounded-md"
        >
          new
        </button>
      </div>
      <div className="min-h-[80vh] flex flex-wrap gap-4 justify-center lg:mt-10">
        {FilterProductData &&
          FilterProductData.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow w-[320px]"
            >
              <img
                src={product.product_image_url}
                alt={product.Product_name}
                className="w-full h-48 object-contain"
              />
              <h2 className="text-xl font-semibold mt-2">
                {product.Product_name}
              </h2>
              <p className="text-gray-600">{product.Description}</p>
              <p className="mt-1">Price: ₹{product.Price}</p>
              <p className="text-sm text-gray-500">
                Original: ₹{product.Original_Price} | {product.off}% off
              </p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => openEditModal(product)}
                  className="text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    handledelete(
                      product._id,
                      product.Product_name,
                      product.category
                    )
                  }
                  className="text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

        {showModal && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl w-96">
              {editData?._id ? "Edit Product" : "Add Product"}
              <div className="relative group">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Uploaded Preview"
                      className="object-contain w-full rounded-lg m-2 h-64"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg">
                      <label
                        htmlFor="dropzone-file"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer p-2 bg-white rounded-full shadow-lg"
                        title="Change image"
                      >
                        <FaEdit className="text-blue-600" />
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </>
                ) : (
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center m-2 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
            5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 
            4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <input
                type="text"
                placeholder="Product Name"
                value={editData?.Product_name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, Product_name: e.target.value })
                }
                className="w-full p-2 border mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={editData?.Description || ""}
                onChange={(e) =>
                  setEditData({ ...editData, Description: e.target.value })
                }
                className="w-full p-2 border mb-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={editData?.Price || ""}
                onChange={(e) =>
                  setEditData({ ...editData, Price: e.target.value })
                }
                className="w-full p-2 border mb-2 rounded"
              />
              <input
                type="number"
                placeholder="Original Price"
                value={editData?.Original_Price || ""}
                onChange={(e) =>
                  setEditData({ ...editData, Original_Price: e.target.value })
                }
                className="w-full p-2 border mb-2 rounded"
              />
              <select
                value={editData?.category || ""}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                className="w-full p-2 border mb-2 rounded"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {Categories &&
                  Categories.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>

              <input
                type="number"
                placeholder="Off (%)"
                value={editData?.off || ""}
                onChange={(e) =>
                  setEditData({ ...editData, off: e.target.value })
                }
                className="w-full p-2 border mb-2 rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditData({
                      Product_name: "",
                      Price: "",
                      Original_Price: "",
                      Description: "",
                      category: "",
                      off: "",
                    });
                    setPreview("");
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  onClick={() =>
                    editData?._id ? handleUpdate(editData._id) : handleCreate()
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Saving" : "save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
