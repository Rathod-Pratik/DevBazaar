import mongoose from "mongoose";
import { z } from "zod";

const mongoIdSchema = z
  .string({ required_error: "ID is required" })
  .trim()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Must be a valid MongoDB id",
  });

const codeSchema = z.string({ required_error: "code is required" }).trim().min(1, "code is required");

const voucherTypeSchema = z.enum(["percentage", "fixed"], {
  required_error: "type is required",
});

const amountSchema = z.coerce.number().nonnegative();

export const createVoucherSchema = z.object({
  code: codeSchema,
  type: voucherTypeSchema,
  value: z.coerce.number({ required_error: "value is required" }).positive("value must be greater than 0"),
  minOrderAmount: amountSchema.optional().default(0),
  maxDiscount: amountSchema.optional().default(0),
  usageLimit: z.coerce.number().int().nonnegative().optional().default(0),
  startDate: z.coerce.date().optional().nullable().default(null),
  endDate: z.coerce.date().optional().nullable().default(null),
  active: z.coerce.boolean().optional().default(true),
  description: z.string().trim().optional().default(""),
});

export const updateVoucherSchema = z.object({
  _id: mongoIdSchema,
  code: codeSchema.optional(),
  type: voucherTypeSchema.optional(),
  value: z.coerce.number().positive("value must be greater than 0").optional(),
  minOrderAmount: amountSchema.optional(),
  maxDiscount: amountSchema.optional(),
  usageLimit: z.coerce.number().int().nonnegative().optional(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  active: z.coerce.boolean().optional(),
  description: z.string().trim().optional(),
});

export const voucherIdSchema = z.object({
  _id: mongoIdSchema,
});

export const applyVoucherSchema = z.object({
  orderId: mongoIdSchema,
  code: codeSchema,
});

export const getVoucherQuerySchema = z.object({
  code: codeSchema.optional(),
  active: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
});

export const validate = (schema, payload) => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message || "Invalid request data",
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
