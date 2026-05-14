import express from "express";
import { ForgotPassword, VerifyOTP, ResetPassword } from "./OTP.Controller.js";
import { otpRateLimiter } from "../../Middleware/RateLimit.middleware.js";

const router = express.Router();

router.post("/auth/forgot-password", otpRateLimiter, ForgotPassword);
router.post("/auth/verify-otp", otpRateLimiter, VerifyOTP);
router.post("/auth/reset-password", otpRateLimiter, ResetPassword);

export default router;
