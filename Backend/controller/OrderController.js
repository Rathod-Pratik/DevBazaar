const OrderModel = require("../model/OrderModel.js");

const CancelOrder = async (req, res) => {
  const { user, Product_name } = req.body; // Use correct field name

  if (!user || !Product_name) {
    return res.status(400).json({ error: "User and Product name are required" });
  }

  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { user, Product_name }, // Ensure this matches your schema
      { status: "Cancelled" },
      { new: true } // Returns the updated document
    );

    if (updatedOrder) {
      return res.status(200).json({ message: "Order cancelled successfully", updatedOrder });
    } else {
      return res.status(404).json({ message: "Product not found in orders" });
    }
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetOrder = async (req, res) => {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await OrderModel.find({ user }); // Use find() to get multiple orders

    if (orders.length > 0) {
      return res.status(200).json({ orders });
    } else {
      return res.status(404).json({ message: "No orders found" });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { GetOrder, CancelOrder };