import { z } from "zod";

// Hero Update Schema
export const heroUpdateSchema = z.object({
  heroTitle: z
    .string({ required_error: "heroTitle is required" })
    .trim()
    .min(1, "heroTitle must not be empty"),
  heroDescription: z
    .string({ required_error: "heroDescription is required" })
    .trim()
    .min(1, "heroDescription must not be empty"),
  heroSubtitle: z.string().trim().optional(),
  heroImage: z.string().trim().optional(),
});

// Stats Update Schema
export const statsUpdateSchema = z.object({
  stats: z
    .array(
      z.object({
        label: z.string().trim().min(1, "label must not be empty"),
        value: z.string().trim().min(1, "value must not be empty"),
      }),
      { required_error: "stats array is required" }
    )
    .min(1, "stats array must contain at least one item"),
});

// Team Member Create Schema
export const teamMemberCreateSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(1, "name must not be empty"),
  role: z
    .string({ required_error: "role is required" })
    .trim()
    .min(1, "role must not be empty"),
  image: z.string().trim().optional(),
});

// Team Member Update Schema
export const teamMemberUpdateSchema = z.object({
  name: z.string().trim().min(1, "name must not be empty").optional(),
  role: z.string().trim().min(1, "role must not be empty").optional(),
  image: z.string().trim().optional(),
}).refine(
  (data) => Object.values(data).some(val => val !== undefined),
  "At least one field is required to update"
);

// Feature Create Schema
export const featureCreateSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .trim()
    .min(1, "title must not be empty"),
  description: z
    .string({ required_error: "description is required" })
    .trim()
    .min(1, "description must not be empty"),
  icon: z.string().trim().optional(),
});

// Feature Update Schema
export const featureUpdateSchema = z.object({
  title: z.string().trim().min(1, "title must not be empty").optional(),
  description: z.string().trim().min(1, "description must not be empty").optional(),
  icon: z.string().trim().optional(),
}).refine(
  (data) => Object.values(data).some(val => val !== undefined),
  "At least one field is required to update"
);

// Stat Delete Schema (for ID validation)
export const idSchema = z.object({
  id: z
    .string({ required_error: "id is required" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
});
