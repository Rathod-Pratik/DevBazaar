import mongoose from "mongoose";
const ProductShema = new mongoose.Schema({
  Product_name: {
    type: String,
    required: true,
  },
  product_image_url: {
    type: String,
    required: true,
  },
  off: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
});
const ProductModel = mongoose.model("product", ProductShema);

export default ProductModel;
