import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    product_date: {
      type: Object,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
    },
    productData: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  { Timestamp: true }
);

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
