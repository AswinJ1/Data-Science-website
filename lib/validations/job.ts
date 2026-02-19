import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
  experience: z.string().min(1, "Experience level is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  salary: z.string().optional(),
  salaryMin: z.coerce.number().int().positive("Minimum salary must be positive").optional().nullable(),
  salaryMax: z.coerce.number().int().positive("Maximum salary must be positive").optional().nullable(),
  salaryCurrency: z.string().default("INR"),
  openings: z.coerce.number().int().min(1, "At least 1 opening required").default(1),
  mandatoryRequirements: z.array(z.string()).default([]),
  optionalRequirements: z.array(z.string()).default([]),
  isActive: z.boolean().optional().default(true),
}).refine((data) => {
  if (data.salaryMax && data.salaryMin && data.salaryMax < data.salaryMin) {
    return false;
  }
  return true;
}, {
  message: "Maximum salary must be greater than or equal to minimum salary",
  path: ["salaryMax"],
});

export type JobInput = z.infer<typeof jobSchema>;
