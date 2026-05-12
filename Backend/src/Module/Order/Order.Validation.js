import mongoose from "mongoose";
import { z } from "zod";

const mongoId = z
  .string({ required_error: "ID is required" })
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

const itemSchema = z.object({
  productId: mongoId,
  quantity: z.coerce.number({ required_error: "quantity is required" }).int().positive(),
  price: z.coerce.number({ required_error: "price is required" }).positive(),
  discountPrice: z.coerce.number().nonnegative().optional().default(0),
});

const pricingSchema = z.object({
  subtotal: z.coerce.number({ required_error: "subtotal is required" }).nonnegative(),
  tax: z.coerce.number().nonnegative().optional().default(0),
  shippingCharge: z.coerce.number().nonnegative().optional().default(0),
  discount: z.coerce.number().nonnegative().optional().default(0),
  total: z.coerce.number({ required_error: "total is required" }).nonnegative(),
});

const shippingAddressSchema = z.object({
  fullName: z.string({ required_error: "fullName is required" }).trim().min(1),
  mobile: z.string({ required_error: "mobile is required" }).trim().min(1),
  email: z.string().email("Invalid email").trim().optional().default(""),
  addressLine: z.string({ required_error: "addressLine is required" }).trim().min(1),
  landmark: z.string().trim().optional().default(""),
  city: z.string({ required_error: "city is required" }).trim().min(1),
  state: z.string({ required_error: "state is required" }).trim().min(1),
  country: z.string().trim().optional().default("India"),
  pincode: z.string({ required_error: "pincode is required" }).trim().min(1),
  addressType: z.enum(["home", "office"]).optional().default("home"),
});

const paymentSchema = z.object({
  method: z.enum(["cod", "upi", "card", "netbanking", "wallet"], {
    required_error: "payment method is required",
  }),
  paymentGateway: z.string().trim().optional().default(""),
  transactionId: z.string().trim().optional().default(""),
  gatewayOrderId: z.string().trim().optional().default(""),
  gatewayPaymentId: z.string().trim().optional().default(""),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional().default("pending"),
});

const couponSchema = z.object({
  code: z.string().toUpperCase().trim().optional().default(""),
  type: z.enum(["percentage", "fixed"]).optional().default("fixed"),
  value: z.coerce.number().nonnegative().optional().default(0),
  appliedDiscount: z.coerce.number().nonnegative().optional().default(0),
});

export const createOrderSchema = z.object({
  orderNumber: z.string({ required_error: "orderNumber is required" }).trim().min(1),
  userId: mongoId,
  items: z.array(itemSchema, { required_error: "items is required" }).min(1),
  pricing: pricingSchema,
  shippingAddress: shippingAddressSchema,
  payment: paymentSchema,
  coupon: couponSchema.optional(),
  status: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "returned",
  ]).optional().default("pending"),
  note: z.string().trim().optional().default(""),
});

export const cancelOrderSchema = z.object({
  _id: mongoId,
  status: z.literal("cancelled").optional(),
});

export const getOrderSchema = z.object({
  user: mongoId,
  status: z.string().trim().optional(),
});

export const getAllOrderSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
});

export const getOrderByIdSchema = z.object({
  id: mongoId,
});

export const validate = (schema, payload) => {
  const res = schema.safeParse(payload);
  if (!res.success) return { success: false, message: res.error.issues[0].message };
  return { success: true, data: res.data };
};
