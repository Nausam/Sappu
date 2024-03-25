import * as z from "zod";

export const tournamentFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Descrtiption must be at least 3 characters long")
    .max(400, "Descrtiption must be less than 400 characters"),
  imageUrl: z.string(),
  categoryId: z.string(),
  prizePool: z.string(),
  entryFee: z.string(),
  hasStarted: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
});

export const teamFormSchema = z.object({
  name: z.string().min(3, "Title must be at least 3 characters long"),
  moto: z.string().min(3, "Moto must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Descrtiption must be at least 3 characters long")
    .max(400, "Descrtiption must be less than 400 characters"),
  imageUrl: z.string(),
  categoryId: z.string(),
  players: z.string(),
});
