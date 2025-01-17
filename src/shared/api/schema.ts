import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export type CreateEventSchema = z.infer<typeof CreateEventSchema>;

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
});

export const EditEventSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;