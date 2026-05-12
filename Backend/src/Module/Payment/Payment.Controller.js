import crypto from "crypto";
import { razorpayInstance } from "../../../api/index.js";
import CartModel from "../Cart/Cart.Model.js";
import OrderModel from "../Order/Order.Model.js";
import PaymentModel from "./Payment.Model.js";
import { createOrderSchema, fetchPaymentSchema, refundSchema, validate, verifyOrderSchema } from "./Payment.Validation.js";

export const createOrder = async (req, res) => {
  const validated = validate(createOrderSchema, req.body);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  const { amount, currency, receipt, notes } = validated.data;

  try {
    const amountInPaise = Math.round(amount * 100);

    if (amountInPaise < 100) {
      return res.status(400).json({ success: false, message: "Amount must be at least ₹1 (100 paise)" });
    }

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise.toString(),
      currency,
      receipt,
      notes,
      payment_capture: 1,
    });

    return res.status(201).json({
      success: true,
      order,
      key: process.env.RAZERPAY_API_KEY,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);

    const errorMessage = error.error?.description || error.message || "Failed to create order";

    return res.status(error.statusCode || 500).json({
      success: false,
      error: errorMessage,
    });
  }
};

export const verifyOrder = async (req, res) => {
  const validated = validate(verifyOrderSchema, req.body);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  const { orderId, paymentId, signature } = validated.data;
  const keySecret = process.env.RAZERPAY_API_SECRET;

  if (!keySecret) {
    return res.status(500).json({ success: false, message: "Server error: Razorpay secret key not found" });
  }

  try {
    const [gatewayOrder, gatewayPayment] = await Promise.all([
      razorpayInstance.orders.fetch(orderId),
      razorpayInstance.payments.fetch(paymentId),
    ]);

    const hmac = crypto.createHmac("sha256", keySecret);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest("hex");
    const matchedOrder = await OrderModel.findOne({ "payment.gatewayOrderId": orderId });

    if (!matchedOrder) {
      return res.status(404).json({ success: false, message: "Order not found for this payment" });
    }

    if (generatedSignature !== signature) {
      await PaymentModel.findOneAndUpdate(
        { gatewayPaymentId: paymentId },
        {
          gateway: "razorpay",
          gatewayOrderId: orderId,
          orderId: matchedOrder._id,
          gatewayPaymentId: paymentId,
          gatewaySignature: signature,
          receipt: gatewayOrder?.receipt || "",
          amount: gatewayPayment?.amount || 0,
          currency: gatewayPayment?.currency || gatewayOrder?.currency || "INR",
          status: "failed",
          gatewayOrderDetails: gatewayOrder,
          gatewayPaymentDetails: gatewayPayment,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const paymentRecord = await PaymentModel.findOneAndUpdate(
      { gatewayPaymentId: paymentId },
      {
        gateway: "razorpay",
        gatewayOrderId: orderId,
        orderId: matchedOrder._id,
        gatewayPaymentId: paymentId,
        gatewaySignature: signature,
        receipt: gatewayOrder?.receipt || "",
        amount: gatewayPayment?.amount || 0,
        currency: gatewayPayment?.currency || gatewayOrder?.currency || "INR",
        status: "verified",
        verifiedAt: new Date(),
        gatewayOrderDetails: gatewayOrder,
        gatewayPaymentDetails: gatewayPayment,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      matchedOrder._id,
      {
        $set: {
          "payment.method": gatewayPayment?.method || "upi",
          "payment.paymentGateway": "razorpay",
          "payment.transactionId": paymentId,
          "payment.gatewayOrderId": orderId,
          "payment.gatewayPaymentId": paymentId,
          "payment.paymentStatus": "paid",
          "payment.paidAt": new Date(),
        },
      }
      , { new: true });

    return res.status(200).json({
      success: true,
      message: "Payment has been verified",
      payment: paymentRecord,
      order: updatedOrder,
      razorpayOrder: gatewayOrder,
      razorpayPayment: gatewayPayment,
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const Refund = async (req, res) => {
  const validated = validate(refundSchema, req.body);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  try {
    const { payment_id, amount } = validated.data;
    const payment = await razorpayInstance.payments.fetch(payment_id);

    if (!payment || !payment.amount) {
      return res.status(400).json({ success: false, message: "Invalid payment details or missing amount" });
    }

    const refundAmount = amount || payment.amount;

    if (refundAmount < 100) {
      return res.status(400).json({
        success: false,
        message: "The refund amount must be at least INR 1.00",
      });
    }

    const refund = await razorpayInstance.payments.refund(payment_id, { amount: refundAmount });

    return res.json({
      success: true,
      message: "Refund initiated successfully!",
      refund,
    });
  } catch (error) {
    console.error("Razorpay Refund Error:", error);
    return res.status(500).json({ success: false, message: error.error?.description || "Refund failed" });
  }
};

export const GetPaymentData = async (req, res) => {
  const validated = validate(fetchPaymentSchema, req.query);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  const { paymentId, orderId, status, page, limit } = validated.data;

  try {
    const query = {};

    if (paymentId) {
      query.gatewayPaymentId = paymentId;
    }

    if (orderId) {
      query.gatewayOrderId = orderId;
    }

    if (status) {
      query.status = status;
    }

    if (paymentId || orderId) {
      const payment = await PaymentModel.findOne(query).populate("orderId");

      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment data not found" });
      }

      return res.status(200).json({ success: true, data: payment });
    }

    const skip = (page - 1) * limit;

    const [total, payments] = await Promise.all([
      PaymentModel.countDocuments(query),
      PaymentModel.find(query).populate("orderId").sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    return res.status(200).json({
      success: true,
      items: payments,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Payment Fetch Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};