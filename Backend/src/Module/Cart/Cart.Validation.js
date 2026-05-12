import mongoose from "mongoose";
import { z } from "zod";

const mongoIdSchema = z
  .string({ required_error: "ID is required" })
  .trim()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Must be a valid MongoDB id",
  });

export const addToCartSchema = z.object({
  user: mongoIdSchema,
  product: mongoIdSchema,
});

export const removeItemSchema = z.object({
  user: mongoIdSchema,
  product: mongoIdSchema,
});

export const getCartSchema = z.object({
  user: mongoIdSchema,
});


export const validateCartRequest = (schema, payload) => {
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