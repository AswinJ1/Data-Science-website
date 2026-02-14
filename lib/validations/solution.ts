import { z } from "zod";

export const solutionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  industry: z.string().min(2, "Industry is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  icon: z.string().optional(),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  isActive: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
});

export type SolutionInput = z.infer<typeof solutionSchema>;
