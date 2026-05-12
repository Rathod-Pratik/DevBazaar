import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string({ required_error: "name is required" }).trim().min(1, "name is required"),
  description: z.string({ required_error: "description is required" }).trim().min(1, "description is required"),
  iconName: z.string().trim().optional(),
});

export const categoryUpdateSchema = z
  .object({
    _id: z
      .string({ required_error: "_id is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
    name: z.string().trim().min(1, "name must not be empty").optional(),
    description: z.string().trim().min(1, "description must not be empty").optional(),
    iconName: z.string().trim().optional(),
  })
  .refine((data) => Object.keys(data).some((k) => k !== "_id" && data[k] !== undefined), {
    message: "At least one field is required to update",
  });

export const idSchema = z.object({
  _id: z
    .string({ required_error: "_id is required" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
});
