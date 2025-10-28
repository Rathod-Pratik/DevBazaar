import React, { useEffect, useState } from "react";
import { useAppStore } from "../../Store";
import { apiClient } from "../../lib/api-Client";
import { GET_CANCEL_ORDER } from "../../Utils/Constant";
import { toast } from "react-toastify";

const CancelOrder = () => {
  const { userInfo } = useAppStore();
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiClient.get(`${GET_CANCEL_ORDER}/${userInfo._id}`);
        if (response.status === 200) {
          setOrderData(response.data.data);
        }
      } catch (error) {
        console.error("Fetch Order Error:", error);
        toast.error("Error while fetching Order");
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo?._id) {
      fetchOrder();
    }
  }, [userInfo]);

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const calculateOrderTotal = (products) => {
    return products.reduce((total, product) => {
      return total + Number(product.Price) * Number(product.quantity);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Orders
      </h1>

      {orderData?.length > 0 ? (
        orderData.map((order) => {
          const orderTotal = calculateOrderTotal(order.productData);

          return (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-gray-200"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Order ID: {order._id}
                </h2>
                <span className="text-sm text-gray-500 mt-2 sm:mt-0">
                  {formatDate(order.product_date)}
                </span>
              </div>

              {/* Customer Information */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Name:</span> {order.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Company:</span>{" "}
                      {order.company_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {order.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {order.phone_number}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{order.address}</p>
                  <p>{order.apartment}</p>
                  <p>{order.city}</p>
                </div>
              </div>

              {/* Products */}
              <div className="p-6">
                <h3 className="text-md font-medium text-gray-700 mb-4">
                  Products
                </h3>
                <div className="space-y-4">
                  {order.productData.map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-full sm:w-24 h-24 flex-shrink-0">
                        <img
                          src={product.Product_image}
                          alt={product.Product_name}
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-800">
                          {product.Product_name}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                          <p>
                            <span className="text-gray-500">Quantity:</span>{" "}
                            {product.quantity}
                          </p>
                          <p>
                            <span className="text-gray-500">Price:</span> ₹
                            {product.Price}
                          </p>
                          <p>
                            <span className="text-gray-500">
                              Original Price:
                            </span>{" "}
                            ₹{product.Original_Price}
                          </p>
                          <p>
                            <span className="text-gray-500">Total:</span> ₹
                            {product.totalPrice
                              ? product.totalPrice
                              : product.Price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 sm:flex-row justify-end gap-3">
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Order Total: ₹{orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">You don't have any Canceled orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default CancelOrder;