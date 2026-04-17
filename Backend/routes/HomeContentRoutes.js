import express from "express";
import { getHomeContent } from "../controller/HomeContentController.js";

const router = express.Router();

router.get("/get-home-content", getHomeContent);

export default router;