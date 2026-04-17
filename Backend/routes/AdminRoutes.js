import express from "express";
import { Stats } from "../controller/AdminController.js";
import { verifyAdmin } from "../middleware/User.middleware.js";
import {
	createHomeSection,
	getHomeContent,
	updateHomeSection,
	uploadHomeSectionImage,
} from "../controller/HomeContentController.js";
import {
	getAdminAboutContent,
	upsertAboutContent,
	uploadAboutImage,
} from "../controller/AboutContentController.js";
import upload from "../middleware/multerMiddleware.js";
import { UploadToCloudinary } from "../middleware/File.middleware.js";
const router=express.Router();

router.get('/getstats',verifyAdmin,Stats);
router.get('/home-content',verifyAdmin,getHomeContent);
router.post('/home-content/create',verifyAdmin,createHomeSection);
router.put('/home-content/update/:sectionType',verifyAdmin,updateHomeSection);
router.post('/home-content/upload-image',verifyAdmin,upload.single('image'),UploadToCloudinary,uploadHomeSectionImage);
router.get('/about-content',verifyAdmin,getAdminAboutContent);
router.put('/about-content',verifyAdmin,upsertAboutContent);
router.post('/about-content/upload-image',verifyAdmin,upload.single('image'),UploadToCloudinary,uploadAboutImage);

export default router