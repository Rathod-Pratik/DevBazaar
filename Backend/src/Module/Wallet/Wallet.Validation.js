import { z } from "zod";

export const userIdSchema = z.object({ userId: z.string().min(1) });

export const addFundsSchema = z.object({
  userId: z.string().min(1),
  amount: z.number().positive(),
  meta: z.optional(z.record(z.any())),
});

export const withdrawSchema = z.object({
  userId: z.string().min(1),
  amount: z.number().positive(),
  meta: z.optional(z.record(z.any())),
});

export const getHistorySchema = z.object({
  userId: z.string().min(1),
  page: z.optional(z.number().positive()),
  limit: z.optional(z.number().positive()),
});

export const validate = (schema, data) => {
  const parsed = schema.safeParse(data);
  return parsed.success ? { success: true, data: parsed.data } : { success: false, message: parsed.error.issues.map(i => i.message).join(", ") };
};
