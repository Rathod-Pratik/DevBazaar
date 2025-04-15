import Billing from "../model/BillingModel.js";
import CartModel from "../model/CartModel.js";
import OrderModel from "../model/OrderModel.js";

export const CancelOrder = async (req, res) => {
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

export const GetOrder = async (req, res) => {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await OrderModel.find({ user }); // Use find() to get multiple orders

    if (orders.length > 0) {
      return res.status(200).json({ orders });
    } else {
      return res.status(200).json({ message: "No orders found" });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export async function CreateOrder(req, res) {
  const {
    user,
    Name,
    company_name,
    address,
    apartment,
    city,
    phoneNumber,
    email,
    productData,
  } = req.body;

  if (
    !user||
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

  const alreadyExistInBilling = await Billing.findOne({
    Name: Name,
    email: email,
    phoneNumber: phoneNumber,
    productData: productData,
  });
  const alreadyExistInOrder = await OrderModel.findOne({
    user,
    product: productData,
  });


  if (alreadyExistInBilling && alreadyExistInOrder) {
    res.status(200).json({ message: "Product already exists in Billing" });
  }
  try {
    const AddToBilling = await Billing.create({
      name: Name,
      company_name: company_name,
      address: address,
      apartment: apartment,
      city: city,
      phone_number: phoneNumber,
      email: email,
      productData: productData,
    });

    const newOrder = OrderModel.create({
      user,
      product: productData,
      status: "Pending",
    });

    // Remove product from CartModel
    const deleteCart = await CartModel.deleteMany({ user });

    if (deleteCart.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in the Cart" });
    }

    if (AddToBilling || newOrder) {
      return res.status(201).json({ message: "Product added to Billing" });
    } else {
      return res
        .status(400)
        .json({ message: "Product failed to add to Billing" });
    }
  } catch (error) {
    console.log("Error adding to Billing:", error.message);
  }
}