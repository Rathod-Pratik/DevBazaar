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
    type: String,
     required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  }
});
const ProductModel = mongoose.model("product", ProductShema);

export default ProductModel;
