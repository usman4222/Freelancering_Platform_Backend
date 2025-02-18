import z from "zod";
import { JOB_STATUS } from "../config/enums/enums.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email().min(3),
  password: z.string().min(6),
});

const createCategoriesSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
});

const updateCategoriesSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
});

const jobStatusSchema = z.object({
  status: z.enum([Object.values(JOB_STATUS)]),
});

const socialLinksSchema = z.object({
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

const clientProfileValidationSchema = z.object({
  fullname: z.string().min(1, "Fullname is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  website: z.string().url().optional(),
  whatsappNumber: z.string().regex(/^\+?\d{1,4}[\s\-]?\(?\d*\)?[\s\-]?\d+$/, "Invalid phone number format").optional(),
  country: z.string().min(1, "Country is required").optional(),
  state: z.string().optional(),
  friendlyAddress: z.string().min(1, "Friendly address is required").optional(),
  introduceYourself: z.string().min(1, "Introduction is required").optional(),
  social: socialLinksSchema.optional(), // optional social media links object
});

export {
  loginSchema,
  registerSchema,
  createCategoriesSchema,
  updateCategoriesSchema,
  jobStatusSchema,
  clientProfileValidationSchema
};

export default { loginSchema, registerSchema };
