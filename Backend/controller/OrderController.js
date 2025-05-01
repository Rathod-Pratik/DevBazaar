import CartModel from "../model/CartModel.js";
import OrderModel from "../model/OrderModel.js";

export const CancelOrder = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ error: "_id is required" });
  }

  try {
    // Issue 1: findOneAndUpdate requires a query object as first parameter
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id }, // Corrected: Wrap _id in a query object
      { status: "cancelled" }, // Changed to "cancelled" (more standard)
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ 
      message: "Order cancelled successfully", 
      updatedOrder 
    });

  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message // Added error details for debugging
    });
  }
};

export const GetOrder = async (req, res) => {
  const { user } = req.params;

  if (!user) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await OrderModel.find({
      user,status:'success'
    }); 

    if (!orders) {
      return res
        .status(200)
        .json({ success: false, message: "No orders found" });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export async function CreateOrder(req, res) {
  const {
    paymentId,
    user,
    Name,
    company_name,
    address,
    city,
    phoneNumber,
    email,
    productData,
    apartment,
  } = req.body;

  if (
    !paymentId ||
    !user ||
    !Name ||
    !company_name ||
    !address ||
    !city ||
    !phoneNumber ||
    !email ||
    !productData ||
    !apartment
  ) {
    return res.status(400).json({ error: "All the Product data is required" });
  }

  try {
    const AddToOrder = await OrderModel.create({
      paymentId:paymentId,
      user: user,
      name: Name,
      company_name: company_name,
      address: address,
      city: city,
      phone_number: phoneNumber,
      email: email,
      productData: productData,
      apartment: apartment,
    });

    // Remove product from CartModel
    const deleteCart = await CartModel.deleteMany({ user });

    if (deleteCart.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in the Cart" });
    }

    if (AddToOrder) {
      return res
        .status(201)
        .json({ OrderData: AddToOrder, message: "Product added to Billing" });
    } else {
      return res
        .status(400)
        .json({ message: "Product failed to add to Billing" });
    }
  } catch (error) {
    res.status(400).json({messge: error.message});
  }
}

export const GetCancelOrder=async(req,res)=>{
  const { user } = req.params;

  if (!user) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await OrderModel.find({
      user,status:'cancelled'
    }); 

    if (!orders) {
      return res
        .status(200)
        .json({ success: false, message: "No orders found" });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const GetAllOrder=async(req,res)=>{

  try {
    const orders = await OrderModel.find(); 

    if (!orders) {
      return res
        .status(200)
        .json({ success: false, message: "No orders found" });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}