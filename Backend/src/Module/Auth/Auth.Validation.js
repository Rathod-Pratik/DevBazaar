import { z } from "zod";

const mongoId = z
	.string({ required_error: "_id is required" })
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

const emailSchema = z.string({ required_error: "email is required" }).trim().email("enter valid email");

const passwordSchema = z
	.string({ required_error: "password is required" })
	.trim()
	.min(5, "Enter a valid password");

const nameSchema = z.string({ required_error: "name is required" }).trim().min(1, "name is required");

const otpSchema = z
	.string({ required_error: "otp is required" })
	.trim()
	.regex(/^\d{6}$/, "Invalid OTP");

const addressUpdateSchema = z.object({
	fullAddress: z.string().trim().min(1).optional(),
	landmark: z.string().trim().min(1).optional(),
	city: z.string().trim().min(1).optional(),
	state: z.string().trim().min(1).optional(),
	country: z.string().trim().min(1).optional(),
	pincode: z.string().trim().min(1).optional(),
	type: z.enum(["home", "office"]).optional(),
}).partial();

export const signupSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
	name: nameSchema,
});

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

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

export const profileUpdateSchema = z.object({
	name: nameSchema.optional(),
	mobile: z.string().trim().min(1, "mobile is required").optional(),
	mobileNumber: z.string().trim().min(1, "mobile is required").optional(),
	image: z.string().trim().min(1).optional(),
	fullAddress: z.string().trim().min(1).optional(),
	landmark: z.string().trim().min(1).optional(),
	city: z.string().trim().min(1).optional(),
	state: z.string().trim().min(1).optional(),
	country: z.string().trim().min(1).optional(),
	pincode: z.string().trim().min(1).optional(),
	type: z.enum(["home", "office"]).optional(),
	address: addressUpdateSchema.optional(),
}).refine(
	(data) =>
		Boolean(
			data.name ||
			data.mobile ||
			data.mobileNumber ||
			data.image ||
			data.fullAddress ||
			data.landmark ||
			data.city ||
			data.state ||
			data.country ||
			data.pincode ||
			data.type ||
			data.address
		),
	{
		message: "At least one profile field is required",
	}
);

export const userActionSchema = z.object({
	_id: mongoId,
});

export const validate = (schema, payload) => {
	const result = schema.safeParse(payload);

	if (!result.success) {
		return { success: false, message: result.error.issues[0].message };
	}

	return { success: true, data: result.data };
};
