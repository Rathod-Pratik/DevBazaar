import express from "express";
import { Stats } from "../controller/AdminController.js";
const router=express.Router();

router.get('/getstats',Stats);

export default router