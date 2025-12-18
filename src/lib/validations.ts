import { z } from "zod";

export const registerTeamSchema = z
  .object({
    teamName: z
      .string()
      .min(3, "Team name is too short")
      .max(20, "Team name is too long"),
    collegeName: z.string().min(3).max(60),
    p1Name: z.string().min(3).max(60),
    p1Email: z.email(),
    p1Phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    p2Name: z.string().min(3),
    p2Email: z.email(),
    p2Phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  })
  .refine((data) => data.p1Email !== data.p2Email, {
    message: "Player 1 and Player 2 emails must be different",
  })
  .refine((data) => data.p1Phone !== data.p2Phone, {
    message: "Player 1 and Player 2 phone numbers must be different",
  });
