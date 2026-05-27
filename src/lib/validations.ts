import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Nickname debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const bookingSchema = z.object({
  modelId: z.string().min(1, "Selecciona un modelo"),
  date: z.string().min(1, "Selecciona una fecha"),
  startTime: z.string().min(1, "Selecciona una hora"),
  serviceIds: z.array(z.string()).min(1, "Selecciona al menos un servicio"),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Asunto requerido"),
  message: z.string().min(20, "Mensaje muy corto"),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().min(10, "Review muy corto"),
});

export const searchSchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  type: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sortBy: z.enum(["newest", "rating", "price_low", "price_high"]).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
