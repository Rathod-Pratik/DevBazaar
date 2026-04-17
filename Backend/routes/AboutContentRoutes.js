import express from "express";
import { getPublicAboutContent } from "../controller/AboutContentController.js";

const router = express.Router();

router.get("/get-about-content", getPublicAboutContent);

export default router;
