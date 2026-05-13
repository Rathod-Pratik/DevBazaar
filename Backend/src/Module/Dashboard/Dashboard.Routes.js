import express from "express";
import { GetDashboardStats } from "./Dashboard.Controller.js";
import { verifyAdmin } from "../../Middleware/Auth.middleware.js";

const router = express.Router();

router.get("/stats", verifyAdmin, GetDashboardStats);

export default router;
