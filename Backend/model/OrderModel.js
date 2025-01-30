const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Object,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
