import express from 'express'
import { Get_Product, Delete_Product, Update_Product, Create_Product } from "./Product.Controller.js";
import upload from '@middleware/Multer.Middleware.js';
import { verifyAdmin } from '@middleware/Auth.middleware.js';

const router = express.Router();

// Get products with pagination (query params: page, limit)
router.get("/getproduct", Get_Product);

// Create product with main image and optional menifecture images
router.post(
  "/createproduct",
  verifyAdmin,
  upload.fields([
    { name: 'product_image', maxCount: 1 },
    { name: 'Menifecture_image', maxCount: 10 }
  ]),
  Create_Product
);

router.post('/removeproduct/:id', verifyAdmin, Delete_Product);

router.put(
  '/updateProduct/:id',
  verifyAdmin,
  upload.fields([
    { name: 'product_image', maxCount: 1 },
    { name: 'Menifecture_image', maxCount: 10 }
  ]),
  Update_Product
);

export default router;