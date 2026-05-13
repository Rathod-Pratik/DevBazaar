import express from 'express'
import { Get_Product, Get_Product_ById, Delete_Product, Update_Product, Create_Product } from "./Product.Controller.js";
import upload from '../../Middleware/Multer.Middleware.js';
import { verifyAdmin } from '../../Middleware/Auth.middleware.js';

const router = express.Router();

router.get("/getproduct", Get_Product);
router.get("/getproduct/:id", Get_Product_ById);

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