import { z } from "zod";

export const mongoIdSchema = z.object({
  _id: z.string({ required_error: "_id is required" }).regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
});

export const productIdSchema = z.object({
  ProductId: z
    .string({ required_error: "ProductId is required" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
});

export const reviewCreateSchema = z.object({
  ProductId: z
    .string({ required_error: "ProductId is required" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
  userId: z
    .string({ required_error: "userId is required" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
  reviewText: z
    .string({ required_error: "reviewText is required" })
    .trim()
    .min(1, "reviewText must not be empty"),
  reviewStar: z.coerce
    .number({ required_error: "reviewStar is required" })
    .int("reviewStar must be an integer")
    .min(1, "reviewStar must be at least 1")
    .max(5, "reviewStar must be at most 5"),
});

export const productIdsQuerySchema = z.object({
  productIds: z
    .string({ required_error: "productIds is required" })
    .trim()
    .min(1, "productIds must not be empty"),
});
