import { z } from "zod";

export const checkEmail = (email: string): boolean => {
    if (!email.includes("@")) return false;
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    const [local, domain] = parts;
    if (!local.trim()) return false;
    if (!domain.includes(".")) return false;
    return true;
  };

export const passwordStrength = (password: string): number => {
  let score = 0;
  if (/[0-9]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
};

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .refine((val) => /^[A-Z]/.test(val), {
        message: "First letter must be uppercase",
      }),
    age: z
      .string()
      .min(1, "Age is required")
      .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 0, {
        message: "Age must be a non-negative number",
      }),
    email: z.string().min(1, "Email is required").refine(checkEmail, {
      message: "Invalid email format",
    }),
    gender: z.enum(["male", "female", "other"], {
      message: "Please select a gender",
    }),
    country: z.string().min(1, "Country is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    image: z.string().min(1, "Image is required"),
    terms: z.boolean().refine((val) => { return val}, {
        message: 'You must accept the terms',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type FormSchema = z.infer<typeof formSchema>;
