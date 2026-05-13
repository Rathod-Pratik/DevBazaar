import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        discountPrice: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],

    pricing: {
      subtotal: {
        type: Number,
        required: true,
        default: 0,
      },

      tax: {
        type: Number,
        default: 0,
      },

      shippingCharge: {
        type: Number,
        default: 0,
      },

      discount: {
        type: Number,
        default: 0,
      },

      total: {
        type: Number,
        required: true,
        default: 0,
      },
    },


    shippingAddress: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      mobile: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },

      addressLine: {
        type: String,
        required: true,
        trim: true,
      },


      landmark: {
        type: String,
        default: "",
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        required: true,
        default: "India",
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },

      addressType: {
        type: String,
        enum: ["home", "office"],
        default: "home",
      },
    },

    payment: {
      method: {
        type: String,
        enum: ["cod", "upi", "card", "netbanking", "wallet"],
        required: true,
      },

      paymentGateway: {
        type: String,
        default: "",
      },

      transactionId: {
        type: String,
        default: "",
      },

      gatewayOrderId: {
        type: String,
        default: "",
      },

      gatewayPaymentId: {
        type: String,
        default: "",
      },

      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },

      paidAt: {
        type: Date,
        default: null,
      },
    },

    coupon: {
      code: {
        type: String,
        uppercase: true,
        trim: true,
        default: "",
      },

      type: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "fixed",
      },

      value: {
        type: Number,
        default: 0,
      },

      appliedDiscount: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },

    note: {
      type: String,
      default: "",
    },

    placedAt: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ orderNumber: 1 }, { unique: true });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });

export default mongoose.model("Order", OrderSchema);