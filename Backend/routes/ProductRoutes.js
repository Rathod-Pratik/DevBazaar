import express from 'express'
import { Get_Product, Delete_Product, Update_Product, Create_Product } from "../controller/Products.js";
import { UploadToCloudinary, UpdateImages, DeleteImage } from "../middleware/File.middleware.js";
import upload from '../middleware/multerMiddleware.js';
import { verifyAdmin } from '../middleware/User.middleware.js';

const router = express.Router();

router.get("/getproduct", Get_Product);
router.post("/createproduct",verifyAdmin,upload.single('product_image'),UploadToCloudinary, Create_Product);
router.post('/removeproduct/:id',verifyAdmin,DeleteImage,Delete_Product)
router.put('/updateProduct/:id',verifyAdmin,upload.single('product_image'),UpdateImages,Update_Product)

export default router;