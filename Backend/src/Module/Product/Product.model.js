import mongoose from "mongoose";

const ProductShema = new mongoose.Schema({
  Product_name: {
    type: String,
    required: true,
  },
  image: [{
    type: String,
    required: true,
  }],
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  about: [{
    type: String,
    required: true,
  }],
  Information: {
    type: Object,
    default: {}
  },

  Stock: {
    type: Number,
    required: true,
  },
  Is_Replacement: {
    type: Boolean,
    require: true,
    default: false
  },
  Is_FreeDelivery: {
    type: Boolean,
    require: true,
    default: false
  },
  Is_Warranty: {
    type: Boolean,
    require: true,
    default: false
  },
  Pay_on_Delivery: {
    type: Boolean,
    require: true,
    default: false
  },
  Menifecture_image: [
    {
      type: String,
      require: true
    }
  ],
  rating: {
    average: {
      type: Number,
      default: 0,
    },

    count: {
      type: Number,
      default: 0,
    },

    stars: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    }
  },
  isDelete:{
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const ProductModel = mongoose.model("product", ProductShema);

export default ProductModel;
