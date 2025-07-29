import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email").min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z
  .object({
    email: z.email("Invalid email").min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((val) => val.confirmPassword === val.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
