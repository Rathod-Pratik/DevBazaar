import React from 'react';
import { useAppStore } from '../../Store';

const Order = () => {
  const { orderItem } = useAppStore();

  // Early return if no order data
  if (!orderItem || !orderItem.product) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg">No order details found</p>
      </div>
    );
  }

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    orderItem.product.forEach(item => {
      const price = Number(item.Price) || 0;
      const quantity = Number(item.quantity) || 1;
      total += price * quantity;
    });
    return total.toFixed(2);
  };

  const totalPrice = calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      
      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{orderItem._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p>{new Date(orderItem.Date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="capitalize">{orderItem.status}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="font-semibold mb-3">Products</h2>
          <div className="space-y-4">
            {orderItem.product.map((item, index) => (
              <div key={`${item._id}-${index}`} className="flex items-center border-b pb-4">
                <img 
                  src={item.Product_image} 
                  alt={item.Product_name} 
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.Product_name}</h3>
                  <p className="text-gray-600">Qty: {item.quantity || 1}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.Price}</p>
                  {item.Original_Price && (
                    <p className="text-sm text-gray-500 line-through">₹{item.Original_Price}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="capitalize">{orderItem.status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold">₹{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium text-sm truncate">{orderItem._id}</p>
          
          <div className="flex justify-between mt-2">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-sm">{new Date(orderItem.Date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-sm capitalize">{orderItem.status}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="font-semibold mb-3 text-sm">Products</h2>
          <div className="space-y-3">
            {orderItem.product.map((item, index) => (
              <div key={`${item._id}-${index}-mobile`} className="flex items-center border-b pb-3">
                <img 
                  src={item.Product_image} 
                  alt={item.Product_name} 
                  className="w-16 h-16 object-contain rounded"
                />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-sm">{item.Product_name}</h3>
                  <p className="text-gray-600 text-xs">Qty: {item.quantity || 1}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">₹{item.Price}</p>
                  {item.Original_Price && (
                    <p className="text-xs text-gray-500 line-through">₹{item.Original_Price}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Payment Status</p>
              <p className="text-sm capitalize">{orderItem.status}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-lg font-bold">₹{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;