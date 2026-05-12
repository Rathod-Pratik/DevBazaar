import mongoose from "mongoose";

const HeroItemSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      default: "Featured",
    },

    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "Shop Now",
    },

    buttonLink: {
      type: String,
      default: "/product",
    },

    imageUrl: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }

  },
  { _id: true }
);

const HeroSchema = new mongoose.Schema(
  {
    heroes: [HeroItemSchema],
  },
  { timestamps: true }
);

const HeroModel = mongoose.model("Hero", HeroSchema);


const CategoriesSectionSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      default: "Categories",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "Buy Now",
    },

    buttonLink: {
      type: String,
      default: "/product",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    countdownEndAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CategoriesModel = mongoose.model(
  "CategoriesSection",
  CategoriesSectionSchema
);

const SaleSchema = new mongoose.Schema(
  {

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],


    startAt: {
      type: Date,
      default: null,
    },

  },
  { timestamps: true }
);

const saleModel = mongoose.model(
  "FlashSale",
  SaleSchema
);

const ReviewSchema = new mongoose.Schema(
  {
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

  },
  { timestamps: true }
);

const ReviewModel = mongoose.model(
  "FeaturedReview",
  ReviewSchema
);

export { HeroModel, CategoriesModel, saleModel, ReviewModel };