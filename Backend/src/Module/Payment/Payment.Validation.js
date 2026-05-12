import { z } from "zod";

export const createOrderSchema = z.object({
	amount: z.coerce.number({ required_error: "amount is required" }).positive("amount must be a positive number"),
	currency: z.string().trim().optional().default("INR"),
	receipt: z.string({ required_error: "receipt is required" }).trim().min(1, "receipt is required"),
	notes: z.object({}).passthrough(),
});

export const verifyOrderSchema = z.object({
	orderId: z.string({ required_error: "orderId is required" }).trim().min(1, "orderId is required"),
	paymentId: z.string({ required_error: "paymentId is required" }).trim().min(1, "paymentId is required"),
	signature: z.string({ required_error: "signature is required" }).trim().min(1, "signature is required"),
});

export const refundSchema = z.object({
	payment_id: z.string({ required_error: "payment_id is required" }).trim().min(1, "payment_id is required"),
	amount: z.coerce.number().positive("amount must be a positive number").optional(),
});

export const fetchPaymentSchema = z.object({
	paymentId: z.string().trim().optional().default(""),
	orderId: z.string().trim().optional().default(""),
	status: z.enum(["created", "verified", "failed", "refunded"]).optional(),
	page: z.coerce.number().int().positive().optional().default(1),
	limit: z.coerce.number().int().positive().optional().default(10),
});

export const validate = (schema, payload) => {
	const result = schema.safeParse(payload);

	if (!result.success) {
		return { success: false, message: result.error.issues[0].message };
	}

	return { success: true, data: result.data };
};
