import mongoose from "mongoose";
import HomeContentModel from "../model/HomeContentModel.js";
import ProductModel from "../model/ProductModel.js";
import ReviewModel from "../model/ReviewModel.js";

const DEFAULT_HOME_CONTENT = {
  hero: {
    label: "Featured",
    title: "Iphone 14 Pro Max",
    line1: "Up to 10%",
    line2: "off Voucher",
    buttonText: "Shop Now",
    buttonLink: "/product",
    imageUrl: "/hero.png",
  },
  categoriesSection: {
    tag: "Categories",
    title: "Enhance Your Music Experience",
    buttonText: "Buy Now",
    buttonLink: "/product",
    imageUrl: "/Frame 694.png",
    countdownEndAt: null,
  },
  flashSale: {
    badgeText: "Today's",
    heading: "Flash Sales",
    ctaText: "View All Products",
    ctaLink: "/product",
    productIds: [],
    limit: 5,
  },
  featuredReviews: {
    tag: "Top Reviews",
    title: "What Customers Are Saying",
    reviewIds: [],
    limit: 4,
  },
};

const isValidSection = (sectionType) =>
  ["hero", "categoriesSection", "flashSale", "featuredReviews"].includes(sectionType);

const normalizePayload = (contentMap) => ({
  hero: { ...DEFAULT_HOME_CONTENT.hero, ...(contentMap.hero || {}) },
  categoriesSection: {
    ...DEFAULT_HOME_CONTENT.categoriesSection,
    ...(contentMap.categoriesSection || {}),
  },
  flashSale: {
    ...DEFAULT_HOME_CONTENT.flashSale,
    ...(contentMap.flashSale || {}),
  },
  featuredReviews: {
    ...DEFAULT_HOME_CONTENT.featuredReviews,
    ...(contentMap.featuredReviews || {}),
  },
});

const getFlashSaleProducts = async (flashSaleData) => {
  const { productIds = [], limit = 5 } = flashSaleData || {};

  if (Array.isArray(productIds) && productIds.length > 0) {
    const validIds = productIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
    const products = await ProductModel.find({ _id: { $in: validIds } });
    const productsMap = new Map(products.map((item) => [String(item._id), item]));
    return validIds.map((id) => productsMap.get(String(id))).filter(Boolean);
  }

  return ProductModel.find().limit(Number(limit) || 5);
};

const getFeaturedReviews = async (featuredReviewData) => {
  const { reviewIds = [], limit = 4 } = featuredReviewData || {};

  if (Array.isArray(reviewIds) && reviewIds.length > 0) {
    const validIds = reviewIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
    const reviews = await ReviewModel.find({ _id: { $in: validIds } }).populate(
      "Productid",
      "Product_name product_image_url Price off"
    );
    const reviewMap = new Map(reviews.map((item) => [String(item._id), item]));
    return validIds.map((id) => reviewMap.get(String(id))).filter(Boolean);
  }

  return ReviewModel.find().limit(Number(limit) || 4).populate(
    "Productid",
    "Product_name product_image_url Price off"
  );
};

export const getHomeContent = async (req, res) => {
  try {
    const sections = await HomeContentModel.find();
    const existingSections = sections.map((item) => item.sectionType);
    const contentMap = sections.reduce((acc, item) => {
      acc[item.sectionType] = item.data;
      return acc;
    }, {});

    const normalized = normalizePayload(contentMap);
    const flashSaleProducts = await getFlashSaleProducts(normalized.flashSale);
    const featuredReviews = await getFeaturedReviews(normalized.featuredReviews);

    return res.status(200).json({
      success: true,
      existingSections,
      data: {
        ...normalized,
        flashSale: {
          ...normalized.flashSale,
          products: flashSaleProducts,
        },
        featuredReviews: {
          ...normalized.featuredReviews,
          reviews: featuredReviews,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createHomeSection = async (req, res) => {
  const { sectionType, data } = req.body;

  if (!isValidSection(sectionType)) {
    return res.status(400).json({ success: false, message: "Invalid sectionType" });
  }

  if (!data || typeof data !== "object") {
    return res.status(400).json({ success: false, message: "data object is required" });
  }

  try {
    const existing = await HomeContentModel.findOne({ sectionType });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Section already exists. Use update endpoint.",
      });
    }

    const created = await HomeContentModel.create({ sectionType, data });
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHomeSection = async (req, res) => {
  const { sectionType } = req.params;
  const { data } = req.body;

  if (!isValidSection(sectionType)) {
    return res.status(400).json({ success: false, message: "Invalid sectionType" });
  }

  if (!data || typeof data !== "object") {
    return res.status(400).json({ success: false, message: "data object is required" });
  }

  try {
    const updated = await HomeContentModel.findOneAndUpdate(
      { sectionType },
      { data },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadHomeSectionImage = async (req, res) => {
  if (!req.imageUrl) {
    return res.status(400).json({ success: false, message: "Image upload failed" });
  }

  return res.status(200).json({ success: true, imageUrl: req.imageUrl });
};