import { z } from "zod";

const mongoIdSchema = z
	.string({ required_error: "MongoDB id is required" })
	.trim()
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

const optionalText = z.string().trim().min(1).optional();

const requiredText = (fieldName) =>
	z
		.string({ required_error: `${fieldName} is required` })
		.trim()
		.min(1, `${fieldName} must not be empty`);

const updateRefine = (schema) =>
	schema.refine((data) => Object.values(data).some((value) => value !== undefined), {
		message: "At least one field is required to update",
	});

const normalizeSectionType = (value) => {
	if (typeof value !== "string") {
		return value;
	}

	const normalized = value.trim().toLowerCase().replace(/[\s_-]/g, "");

	switch (normalized) {
		case "hero":
			return "hero";
		case "sale":
		case "categories":
		case "categoriessection":
			return "categories";
		case "flashsale":
			return "flashSale";
		case "review":
		case "reviews":
		case "featuredreviews":
			return "reviews";
		default:
			return value;
	}
};

export const homeSectionTypeSchema = z.preprocess(
	normalizeSectionType,
	z.enum(["hero", "categories", "flashSale", "reviews"]),
);

export const heroCreateSchema = z.object({
	label: optionalText,
	title: requiredText("title"),
	subtitle: optionalText,
	description: optionalText,
	buttonText: optionalText,
	buttonLink: optionalText,
	imageUrl: requiredText("imageUrl"),
	productId: mongoIdSchema.optional(),
});

export const heroUpdateSchema = updateRefine(heroCreateSchema.partial());

export const categoriesCreateSchema = z.object({
	tag: optionalText,
	title: requiredText("title"),
	description: optionalText,
	buttonText: optionalText,
	buttonLink: optionalText,
	imageUrl: requiredText("imageUrl"),
	countdownEndAt: z.coerce.date().optional().nullable(),
	isActive: z.coerce.boolean().optional(),
});

export const categoriesUpdateSchema = updateRefine(categoriesCreateSchema.partial());

export const flashSaleCreateSchema = z.object({
	products: z.array(mongoIdSchema).optional(),
	startAt: z.coerce.date().optional().nullable(),
});

export const flashSaleUpdateSchema = updateRefine(flashSaleCreateSchema.partial());

export const reviewsCreateSchema = z.object({
	reviews: z.array(mongoIdSchema).optional(),
});

export const reviewsUpdateSchema = updateRefine(reviewsCreateSchema.partial());

