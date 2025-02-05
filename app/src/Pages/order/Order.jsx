import React from 'react'
import { useAppStore } from '../../Store'

const Order = () => {
const {orderItem}=useAppStore();
  return (
    <div>
      <div className="hidden md:block">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 border">Order ID</th>
        <th className="p-2 border">Date</th>
        <th className="p-2 border">Total</th>
        <th className="p-2 border">Status</th>
        <th className="p-2 border">Action</th>
      </tr>
    </thead>
    <tbody>
      {orderItem.map((order) => (
        <tr key={order._id} className="border">
          <td className="p-2">{order._id}</td>
          <td className="p-2">{new Date(order.orderDate).toDateString()}</td>
          <td className="p-2">${order.totalPrice}</td>
          <td className="p-2">
            <span className={`px-2 py-1 rounded ${order.status === "Pending" ? "bg-yellow-300" : "bg-green-400"}`}>
              {order.status}
            </span>
          </td>
          <td className="p-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div className="md:hidden">
  {orders.map((order) => (
    <div key={order._id} className="border p-4 mb-4 rounded-lg shadow">
      <p className="font-bold">Order ID: {order._id}</p>
      <p className="text-gray-500">Date: {new Date(order.orderDate).toDateString()}</p>
      <p>Total: <span className="font-semibold">${order.totalPrice}</span></p>
      <p>Status: <span className={`px-2 py-1 rounded ${order.status === "Pending" ? "bg-yellow-300" : "bg-green-400"}`}>
        {order.status}
      </span></p>
      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full">View Details</button>
    </div>
  ))}
</div>

    </div>
  )
}

export default Order
