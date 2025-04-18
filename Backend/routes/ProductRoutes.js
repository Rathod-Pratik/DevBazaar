import express from 'express'
import { Get_Product, Delete_Product, Update_Product, Create_Product } from "../controller/Products.js";
import { upload, UploadToCloudinary, UpdateImages, DeleteImage } from "../middleware/File.middleware.js";

const router = express.Router();

router.get("/getproduct", Get_Product);
router.post("/createproduct",upload.single('product_image'),UploadToCloudinary, Create_Product);
router.post('/removeproduct/:id',DeleteImage,Delete_Product)
router.put('/updateProduct/:id',upload.single('product_image'),UpdateImages,Update_Product)

export default router;