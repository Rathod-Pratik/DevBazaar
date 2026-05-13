import CartModel from "../Cart/Cart.Model.js";
import OrderModel from "./Order.Model.js";
import { validate, cancelOrderSchema, getOrderSchema, getAllOrderSchema, createOrderSchema, getOrderByIdSchema } from "./Order.Validation.js";

export const CancelOrder = async (req, res) => {
  const validated = validate(cancelOrderSchema, req.body);
  if (!validated.success) return res.status(400).json({ error: validated.message });

  const { _id } = validated.data;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      _id,
      { status: "cancelled", cancelledAt: new Date() },
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
      details: error.message
    });
  }
};

export const GetOrder = async (req, res) => {
  const validated = validate(getOrderSchema, { user: req.params.user });
  if (!validated.success) return res.status(400).json({ error: validated.message });

  const { user } = validated.data;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const [total, orders] = await Promise.all([
      OrderModel.countDocuments({ userId: user }),
      OrderModel.find({ userId: user })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
    ]);

    if (!orders || orders.length === 0) {
      return res.status(200).json({ success: false, items: [], page, limit, total, totalPages: Math.ceil(total / limit) });
    }

    return res.status(200).json({ success: true, items: orders, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CreateOrder = async (req, res) => {
  const validated = validate(createOrderSchema, req.body);
  if (!validated.success) return res.status(400).json({ error: validated.message });

  const data = validated.data;

  try {
    const newOrder = await OrderModel.create({
      orderNumber: data.orderNumber,
      userId: data.userId,
      items: data.items,
      pricing: data.pricing,
      shippingAddress: data.shippingAddress,
      payment: data.payment,
      coupon: data.coupon || {},
      status: data.status || "pending",
      note: data.note || "",
      placedAt: new Date(),
    });

    const deleteCart = await CartModel.deleteMany({ user: data.userId });

    if (newOrder) {
      return res.status(201).json({ success: true, OrderData: newOrder, message: "Order created successfully" });
    } else {
      return res.status(400).json({ message: "Failed to create order" });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ error: error.message });
  }
}

export const GetOrderById = async (req, res) => {
  const validated = validate(getOrderByIdSchema, { id: req.params.id });
  if (!validated.success) return res.status(400).json({ error: validated.message });

  const { id } = validated.data;

  try {
    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetAllOrder = async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  try {
    const [total, orders] = await Promise.all([
      OrderModel.countDocuments(),
      OrderModel.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
    ]);

    if (!orders || orders.length === 0) {
      return res.status(200).json({ success: false, items: [], page, limit, total, totalPages: Math.ceil(total / limit) });
    }

    return res.status(200).json({ success: true, items: orders, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}