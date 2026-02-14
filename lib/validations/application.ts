import { z } from "zod";

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  education: z.string().min(2, "Education level is required"),
  institution: z.string().min(2, "Institution name is required"),
  experience: z.string().optional(),
  linkedin: z.string().optional(),
  resume: z.string().min(1, "Resume is required"),
  coverLetter: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
