import mongoose from "mongoose";
import { z } from "zod";

const mongoId = z
  .string({ required_error: "id is required" })
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

export const createProductSchema = z.object({
  Product_name: z.string({ required_error: "Product_name is required" }).trim().min(1),
  discount: z.coerce.number({ required_error: "discount is required" }).optional(),
  category: mongoId,
  Price: z.coerce.number({ required_error: "Price is required" }),
  about: z
    .array(z.string().trim().min(1), { required_error: "about is required" })
    .min(1)
    .optional(),
  Information: z.record(z.any()).optional(),
  Stock: z.coerce.number({ required_error: "Stock is required" }).int().optional(),
  Is_Replacement: z.boolean().optional(),
  Is_FreeDelivery: z.boolean().optional(),
  Is_Warranty: z.boolean().optional(),
  Pay_on_Delivery: z.boolean().optional(),
  Menifecture_image: z.array(z.string()).optional(),
  image: z.array(z.string()).optional(),
});

export const updateProductSchema = createProductSchema.partial().extend({
  _id: mongoId,
});

export const idParamSchema = z.object({
  id: mongoId,
});

export const validate = (schema, payload) => {
  const res = schema.safeParse(payload);
  if (!res.success) return { success: false, message: res.error.issues[0].message };
  return { success: true, data: res.data };
};
