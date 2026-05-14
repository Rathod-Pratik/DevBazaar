import { z } from "zod";

const mongoId = z
	.string({ required_error: "_id is required" })
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

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