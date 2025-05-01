import express from "express";
import { Stats } from "../controller/AdminController.js";
import { verifyAdmin } from "../middleware/User.middleware.js";
const router=express.Router();

router.get('/getstats',verifyAdmin,Stats);

export default router