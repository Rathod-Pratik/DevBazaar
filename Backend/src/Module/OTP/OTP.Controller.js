import bcrypt from "bcryptjs";
import User from "../Auth/Auth.Model.js";
import { sendOTPEmail } from "../../Utils/Mail.js";
import { forgotPasswordSchema, resetPasswordSchema, validate, verifyOtpSchema } from "./OTP.validation.js";
import { clearOtpVerified, deleteOtpCache, getOtpCache, isOtpVerified, setOtpCache, setOtpVerified } from "./OTP.Cache.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const ForgotPassword = async (req, res) => {
  const validated = validate(forgotPasswordSchema, req.body);
  if (!validated.success) {
    return res.status(400).json({ error: validated.message });
  }

  try {
    const { email } = validated.data;

    const user = await User.findOne({ email });
    if (!user || user.isDelete) {
      return res.status(400).json({ NotFound: true, error: "User not found" });
    }

    const otp = generateOTP();
    await setOtpCache(email, otp);
    await clearOtpVerified(email);

    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      await deleteOtpCache(email);
      return res.status(500).json({ error: "Failed to send OTP" });
    }

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const VerifyOTP = async (req, res) => {
  const validated = validate(verifyOtpSchema, req.body);
  if (!validated.success) {
    return res.status(400).json({ error: validated.message });
  }

  try {
    const { email, otp } = validated.data;

    const cachedOtp = await getOtpCache(email);
    const user = await User.findOne({ email });

    if (!user || user.isDelete || !cachedOtp || String(cachedOtp) !== String(otp)) {
      return res.status(400).json({ InvalidOTP: true, error: "Invalid OTP" });
    }

    await setOtpVerified(email);
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ResetPassword = async (req, res) => {
  const validated = validate(resetPasswordSchema, req.body);
  if (!validated.success) {
    return res.status(400).json({ error: validated.message });
  }

  try {
    const { email, password } = validated.data;

    const user = await User.findOne({ email });
    if (!user || user.isDelete) {
      return res.status(400).json({ InvalidEmail: true, error: "User not found" });
    }

    const verified = await isOtpVerified(email);
    if (!verified) {
      return res.status(400).json({ InvalidOTP: true, error: "OTP not verified or expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });
    await deleteOtpCache(email);
    await clearOtpVerified(email);

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
