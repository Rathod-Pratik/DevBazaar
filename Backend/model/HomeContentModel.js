import mongoose from "mongoose";

const HomeContentSchema = new mongoose.Schema(
  {
    sectionType: {
      type: String,
      required: true,
      unique: true,
      enum: ["hero", "categoriesSection", "flashSale", "featuredReviews"],
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  { timestamps: true }
);

const HomeContentModel = mongoose.model("home_content", HomeContentSchema);

export default HomeContentModel;