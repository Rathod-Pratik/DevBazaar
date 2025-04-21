import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { toast } from "react-toastify";
import { GET_ALL_ORDER } from "../../Utils/Constant";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [FilterOrder,SetFilterOrder]=useState();
  const fetchOrderData = async () => {
    try {
      const response = await apiClient.get(GET_ALL_ORDER);
      if (response.data.success) {
        setOrders(response.data.data);
        SetFilterOrder(response.data.data);
      } else {
        toast.info("No orders found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred, try again later.");
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (lowerValue === "") {
      SetFilterOrder(orders);
    } else {
      const filtered = orders.filter((OrderData) =>
        OrderData.name.toLowerCase().includes(lowerValue)
      );
      SetFilterOrder(filtered);
    }
  };
  return (
    <div className="p-4">
          <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-[orange] border-2 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Contacts"
        />
        <button className="text-white bg-[orange] px-5 cursor-pointer py-2 rounded-md"
        >
          new
        </button>
      </div>
  <h2 className="text-2xl font-bold mb-4">Orders</h2>
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="border p-2">Order ID</th>
          <th className="border p-2">Customer</th>
          <th className="border p-2">City</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Products</th>
          <th className="border p-2">Payment ID</th>
        </tr>
      </thead>
      <tbody>
        {FilterOrder?.map((order) => (
          <tr key={order._id} className="hover:bg-gray-50">
            <td className="border p-2 break-words max-w-[150px]">{order._id}</td>
            <td className="border p-2">{order.name}</td>
            <td className="border p-2">{order.city}</td>
            <td className="border p-2">{order.phone_number}</td>
            <td className="border p-2 capitalize">{order.status}</td>
            <td className="border p-2">
              <div className="space-y-2">
                {order.productData.map((product) => (
                  <div key={product._id} className="flex items-center gap-2">
                    <img
                      src={product.Product_image}
                      alt={product.Product_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{product.Product_name}</p>
                      <p className="text-xs text-gray-600">
                        ₹{product.Price} × {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="border p-2 break-words max-w-[120px]">{order.paymentId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Orders;
