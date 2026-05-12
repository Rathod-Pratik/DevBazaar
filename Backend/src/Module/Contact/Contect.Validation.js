import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z.string({ required_error: "name is required" }).trim().min(1, "name is required"),
  email: z.string({ required_error: "email is required" }).trim().email("invalid email"),
  number: z.string({ required_error: "number is required" }).trim().min(1, "number is required"),
  message: z.string({ required_error: "message is required" }).trim().min(1, "message is required"),
  userInfo: z.any({ required_error: "userInfo is required" }),
});

export const idSchema = z.object({
  _id: z
    .string({ required_error: "_id is required" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
});
