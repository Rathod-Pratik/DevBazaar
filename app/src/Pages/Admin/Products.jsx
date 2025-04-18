import { useAppStore } from "../../Store";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CREATE_PRODUCT, GET_CATEGORY } from "../../Utils/Constant";
import { apiClient } from "../../lib/api-Client";
import { toast } from "react-toastify";

const Products = () => {
  const { productData, setproductData } = useAppStore();
  const [FilterProductData, SetFilterProductData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  console.log(productData);
  useEffect(() => {
    SetFilterProductData(productData);
  }, []);
  const handleDelete = (id) => {
    setproductData(productData.filter((item) => item._id !== id));
  };

  const [Categories, setCategories] = useState();
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
  if (!editData.Product_name || !editData.Price) {
    toast.error("Product Name and Price are required.");
    return;
  }

  const formData = new FormData();
  formData.append("Product_name", editData.Product_name);
  formData.append("off", editData.off);
  formData.append("Price", editData.Price);
  formData.append("Original_Price", editData.Original_Price);
  formData.append("Description", editData.Description);
  formData.append("category", editData.category);

  if (editData.product_image_file) {
    formData.append("product_image", editData.product_image_file);  // ✅ EXACTLY THIS NAME
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
      // setShowModal(false);
      // setEditData({});
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to add product");
  }
};

  
  const handleUpdate = () => {
    if (!editData.Product_name || !editData.Price) {
      alert("Product Name and Price are required.");
      return;
    }
  
    setproductData((prev) =>
      prev.map((product) =>
        product._id === editData._id ? editData : product
      )
    );
  
    setShowModal(false);
    setEditData({});
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
            setEditData({});
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
                  onClick={() => handleEdit(product)}
                  className="text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        {/* Edit card */}
        {showModal && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl w-96">
              <h2 className="text-xl font-semibold mb-4">
                {editData?._id ? "Edit Product" : "Add Product"}
              </h2>
              {/* Preview selected image */}
              <div className="relative w-full h-40 mb-4 rounded border overflow-hidden group">
                {editData?.product_image_url && (
                  <img
                    src={editData?.product_image_url}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      document.getElementById("imageUploadInput").click()
                    }
                    className="px-3 py-1 bg-white text-black rounded"
                  >
                    Update Image
                  </button>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  id="imageUploadInput"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditData({
                        ...editData,
                        product_image_url: reader.result,
                      });
                    };
                    if (file) reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
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
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                   onClick={editData._id ? handleUpdate : handleCreate}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
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
