import mongoose from "mongoose";
import { HeroModel, CategoriesModel, saleModel, ReviewModel as FeaturedReviewModel } from "./Home.Model.js";
import ProductModel from "../Product/Product.model.js";
import ReviewModel from "../Review/Review.Model.js";
import { uploadFileToS3 } from "@utils/Function.js";
import {
  heroCreateSchema,
  heroUpdateSchema,
  categoriesCreateSchema,
  categoriesUpdateSchema,
  flashSaleCreateSchema,
  flashSaleUpdateSchema,
  reviewsCreateSchema,
  reviewsUpdateSchema,
} from './Home.Validation.js';

const uploadSectionImage = async (req) => {
  if (!req.file) {
    return null;
  }

  const uploadedImage = await uploadFileToS3({
    buffer: req.file.buffer,
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    folderType: "home",
  });

  return uploadedImage.url;
};

export const getHeroes = async (req, res) => {
  try {
    let heroData = await HeroModel.findOne();
    if (!heroData) {
      heroData = await HeroModel.create({ heroes: [] });
    }
    return res.status(200).json({ success: true, data: heroData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createHero = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = await uploadSectionImage(req);
    }

    const validation = heroCreateSchema.safeParse({
      ...req.body,
      imageUrl,
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { label, title, buttonText, buttonLink } = validation.data;

    if (!title || !buttonLink) {
      return res.status(400).json({ success: false, message: "title and buttonLink are required" });
    }

    let heroData = await HeroModel.findOne();
    if (!heroData) {
      heroData = await HeroModel.create({ heroes: [] });
    }

    heroData.heroes.push({
      label: label || "Featured",
      title,
      buttonText: buttonText || "Shop Now",
      buttonLink,
      imageUrl,
    });

    await heroData.save();
    return res.status(201).json({ success: true, data: heroData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    const { id: heroId } = req.params;

    if (!heroId || !mongoose.Types.ObjectId.isValid(heroId)) {
      return res.status(400).json({ success: false, message: "Invalid or missing heroId" });
    }

    const heroData = await HeroModel.findOne();
    if (!heroData) {
      return res.status(404).json({ success: false, message: "Hero data not found" });
    }

    const hero = heroData.heroes.id(heroId);
    if (!hero) {
      return res.status(404).json({ success: false, message: "Hero not found" });
    }

    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = await uploadSectionImage(req);
    }

    const validation = heroUpdateSchema.safeParse({
      ...req.body,
      imageUrl,
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { label, title, buttonText, buttonLink } = validation.data;

    if (label) hero.label = label;
    if (title) hero.title = title;
    if (buttonText) hero.buttonText = buttonText;
    if (buttonLink) hero.buttonLink = buttonLink;

    if (req.file) {
      hero.imageUrl = await uploadSectionImage(req);
    }

    await heroData.save();
    return res.status(200).json({ success: true, data: heroData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHero = async (req, res) => {
  try {
    const { id: heroId } = req.params;

    if (!heroId || !mongoose.Types.ObjectId.isValid(heroId)) {
      return res.status(400).json({ success: false, message: "Invalid or missing heroId" });
    }

    const heroData = await HeroModel.findOne();
    if (!heroData) {
      return res.status(404).json({ success: false, message: "Hero data not found" });
    }

    heroData.heroes.id(heroId).deleteOne();
    await heroData.save();
    return res.status(200).json({ success: true, message: "Hero deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.findOne();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategories = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = await uploadSectionImage(req);
    }

    const validation = categoriesCreateSchema.safeParse({
      ...req.body,
      imageUrl,
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { tag, title, buttonText, buttonLink } = validation.data;

    if (!title || !buttonLink) {
      return res.status(400).json({ success: false, message: "title and buttonLink are required" });
    }

    const existing = await CategoriesModel.findOne();
    if (existing) {
      return res.status(409).json({ success: false, message: "Categories section already exists" });
    }

    const categories = await CategoriesModel.create({
      tag: tag || "Categories",
      title,
      buttonText: buttonText || "Buy Now",
      buttonLink,
      imageUrl,
    });

    return res.status(201).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.findOne();
    if (!categories) {
      return res.status(404).json({ success: false, message: "Categories section not found" });
    }

    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = await uploadSectionImage(req);
    }

    const validation = categoriesUpdateSchema.safeParse({
      ...req.body,
      imageUrl,
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { tag, title, buttonText, buttonLink } = validation.data;

    if (tag) categories.tag = tag;
    if (title) categories.title = title;
    if (buttonText) categories.buttonText = buttonText;
    if (buttonLink) categories.buttonLink = buttonLink;

    if (req.file) {
      categories.imageUrl = await uploadSectionImage(req);
    }

    await categories.save();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFlashSale = async (req, res) => {
  try {
    const flashSale = await saleModel.findOne().populate("products");
    return res.status(200).json({ success: true, data: flashSale });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createFlashSale = async (req, res) => {
  try {
    const validation = flashSaleCreateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { products: validProductIds = [] } = validation.data;

    const existing = await saleModel.findOne();
    if (existing) {
      return res.status(409).json({ success: false, message: "Flash sale already exists" });
    }

    const flashSale = await saleModel.create({
      products: validProductIds,
    });

    const populated = await flashSale.populate("products");
    return res.status(201).json({ success: true, data: populated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFlashSale = async (req, res) => {
  try {
    const validation = flashSaleUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { products: validProductIds } = validation.data;

    const flashSale = await saleModel.findOne();
    if (!flashSale) {
      return res.status(404).json({ success: false, message: "Flash sale not found" });
    }

    if (validProductIds && Array.isArray(validProductIds)) {
      flashSale.products = validProductIds;
    }

    await flashSale.save();
    const populated = await flashSale.populate("products");
    return res.status(200).json({ success: true, data: populated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFlashSale = async (req, res) => {
  try {
    await saleModel.deleteOne();
    return res.status(200).json({ success: true, message: "Flash sale deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedReviews = async (req, res) => {
  try {
    const reviews = await FeaturedReviewModel.findOne().populate("reviews");
    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createFeaturedReview = async (req, res) => {
  try {
    const validation = reviewsCreateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { reviews: validReviewIds = [] } = validation.data;

    const existing = await FeaturedReviewModel.findOne();
    if (existing) {
      return res.status(409).json({ success: false, message: "Featured reviews already exist" });
    }

    const featured = await FeaturedReviewModel.create({
      reviews: validReviewIds,
    });

    const populated = await featured.populate("reviews");
    return res.status(201).json({ success: true, data: populated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFeaturedReviews = async (req, res) => {
  try {
    const validation = reviewsUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((error) => error.message).join(", "),
      });
    }

    const { reviews: validReviewIds } = validation.data;

    let featured = await FeaturedReviewModel.findOne();
    if (!featured) {
      featured = await FeaturedReviewModel.create({ reviews: [] });
    }

    if (validReviewIds && Array.isArray(validReviewIds)) {
      featured.reviews = validReviewIds;
    }

    await featured.save();
    const populated = await featured.populate("reviews");
    return res.status(200).json({ success: true, data: populated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFeaturedReviews = async (req, res) => {
  try {
    await FeaturedReviewModel.deleteOne();
    return res.status(200).json({ success: true, message: "Featured reviews deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHomeContent = async (req, res) => {
  try {
    const heroes = await HeroModel.findOne();
    const categories = await CategoriesModel.findOne();
    const flashSale = await saleModel.findOne().populate("products");
    const reviews = await ReviewModel.findOne().populate("reviews");

    return res.status(200).json({
      success: true,
      data: {
        heroes: heroes || { heroes: [] },
        categories: categories || null,
        flashSale: flashSale || { products: [] },
        reviews: reviews || { reviews: [] },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};