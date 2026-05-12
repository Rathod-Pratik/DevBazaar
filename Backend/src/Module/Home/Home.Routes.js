import express from "express";
import {
  getHomeContent,
  getHeroes,
  createHero,
  updateHero,
  deleteHero,
  getCategories,
  createCategories,
  updateCategories,
  getFlashSale,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale,
  getFeaturedReviews,
  createFeaturedReview,
  updateFeaturedReviews,
  deleteFeaturedReviews,
} from "./Home.Controller.js";
import { verifyAdmin } from "@middleware/Auth.middleware.js";
import upload from "@middleware/Multer.Middleware.js";

const router = express.Router();

const typeHandler = (handlers) => {
  return (req, res) => {
    const type = (req.query.type || req.body.type || "").toLowerCase();
    const handler = handlers[type];

    if (!handler) {
      return res.status(400).json({ success: false, message: "Invalid or missing type parameter" });
    }

    return handler(req, res);
  };
};

router.get("/get-home-content", getHomeContent);

router.get("/get", typeHandler({
  hero: getHeroes,
  categories: getCategories,
  flashsale: getFlashSale,
  reviews: getFeaturedReviews,
}));

router.post("/create", verifyAdmin, upload.single("image"), typeHandler({
  hero: createHero,
  categories: createCategories,
  flashsale: createFlashSale,
  reviews: createFeaturedReview,
}));

router.put("/update/:id?", verifyAdmin, upload.single("image"), typeHandler({
  hero: updateHero,
  categories: updateCategories,
  flashsale: updateFlashSale,
  reviews: updateFeaturedReviews,
}));

router.delete("/delete/:id?", verifyAdmin, typeHandler({
  hero: deleteHero,
  flashsale: deleteFlashSale,
  reviews: deleteFeaturedReviews,
}));

export default router;