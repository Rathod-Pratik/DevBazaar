import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iconName: { type: String, required: true },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

CategorySchema.index({ name: 1 }, { unique: true });

const Category = mongoose.model("Category", CategorySchema);

export default Category;
