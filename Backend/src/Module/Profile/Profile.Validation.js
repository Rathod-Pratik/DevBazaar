import { z } from "zod";

const mongoId = z
	.string({ required_error: "_id is required" })
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

const addressSchema = z.object({
	fullAddress: z.string().trim().min(1).optional(),
	landmark: z.string().trim().min(1).optional(),
	city: z.string().trim().min(1).optional(),
	state: z.string().trim().min(1).optional(),
	country: z.string().trim().min(1).optional(),
	pincode: z.string().trim().min(1).optional(),
	type: z.enum(["home", "office"]).optional(),
}).partial();

export const profileUpdateSchema = z.object({
	name: z.string({ required_error: "name is required" }).trim().min(1, "name is required").optional(),
	mobile: z.string().trim().min(1, "mobile is required").optional(),
	mobileNumber: z.string().trim().min(1, "mobile is required").optional(),
	image: z.string().trim().min(1).optional(),
	address: addressSchema.optional(),
	fullAddress: z.string().trim().min(1).optional(),
	landmark: z.string().trim().min(1).optional(),
	city: z.string().trim().min(1).optional(),
	state: z.string().trim().min(1).optional(),
	country: z.string().trim().min(1).optional(),
	pincode: z.string().trim().min(1).optional(),
	type: z.enum(["home", "office"]).optional(),
}).refine(
	(data) =>
		Boolean(
			data.name ||
			data.mobile ||
			data.mobileNumber ||
			data.image ||
			data.address ||
			data.fullAddress ||
			data.landmark ||
			data.city ||
			data.state ||
			data.country ||
			data.pincode ||
			data.type
		),
	{
		message: "At least one profile field is required",
	}
);

export const profileQuerySchema = z.object({
	userId: mongoId.optional(),
});

export const validate = (schema, payload) => {
	const result = schema.safeParse(payload);

	if (!result.success) {
		return { success: false, message: result.error.issues[0].message };
	}

	return { success: true, data: result.data };
};
