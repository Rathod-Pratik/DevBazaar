import express from "express";
import { GetProfile, UpdateProfile } from "./Profile.Controller.js";
import { verifyUser } from "@middleware/Auth.middleware.js";

const router = express.Router();

router.get("/getProfile", verifyUser, GetProfile);
router.post("/updateProfile", verifyUser, UpdateProfile);

export default router;
