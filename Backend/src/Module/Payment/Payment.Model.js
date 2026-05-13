import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
	{
		gateway: {
			type: String,
			default: "razorpay",
		},

		gatewayOrderId: {
			type: String,
			default: "",
		},

		orderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			default: null,
		},

		gatewayPaymentId: {
			type: String,
			default: "",
		},

		gatewaySignature: {
			type: String,
			default: "",
		},

		receipt: {
			type: String,
			default: "",
		},

		amount: {
			type: Number,
			default: 0,
		},

		currency: {
			type: String,
			default: "INR",
		},

		status: {
			type: String,
			enum: ["created", "verified", "failed", "refunded"],
			default: "created",
		},

		verifiedAt: {
			type: Date,
			default: null,
		},

		gatewayOrderDetails: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		gatewayPaymentDetails: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},
	},
	{ timestamps: true }
);

paymentSchema.index({ gatewayOrderId: 1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ gatewayPaymentId: 1 });

const PaymentModel = mongoose.model("Payment", paymentSchema);

export default PaymentModel;
