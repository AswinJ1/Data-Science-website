import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  service: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
