import mongoose from "mongoose";
import { z } from "zod";

const mongoIdSchemaValue = z.string().trim().refine((value) => mongoose.Types.ObjectId.isValid(value), {
	message: "Must be a valid MongoDB id",
});

export const wishListCreateSchema = z.object({
	userId: mongoIdSchemaValue,
	productId: mongoIdSchemaValue,
});

export const wishListRemoveSchema = z.object({
	userId: mongoIdSchemaValue,
	productId: mongoIdSchemaValue,
});

export const wishListUserSchema = z.object({
	userId: mongoIdSchemaValue,
});
