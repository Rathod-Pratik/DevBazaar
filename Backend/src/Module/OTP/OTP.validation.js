import { z } from "zod";

const emailSchema = z.string({ required_error: "email is required" }).trim().email("enter valid email");

const passwordSchema = z
	.string({ required_error: "password is required" })
	.trim()
	.min(5, "Enter a valid password");

const otpSchema = z
	.string({ required_error: "otp is required" })
	.trim()
	.regex(/^\d{6}$/, "Invalid OTP");

export const forgotPasswordSchema = z.object({
	email: emailSchema,
});

export const verifyOtpSchema = z.object({
	email: emailSchema,
	otp: otpSchema,
});

export const resetPasswordSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const validate = (schema, payload) => {
	const result = schema.safeParse(payload);

	if (!result.success) {
		return { success: false, message: result.error.issues[0].message };
	}

	return { success: true, data: result.data };
};