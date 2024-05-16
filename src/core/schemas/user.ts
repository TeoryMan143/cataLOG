import { createInsertSchema } from 'drizzle-zod';
import { users } from '../db/tables';
import { z } from 'zod';

export const dbUserSchema = createInsertSchema(users);
export const requestUserSchema = dbUserSchema.omit({ id: true });
export const formUserSchema = requestUserSchema
  .extend({
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(1, 'Campo requerido'),
    number: z
      .string({ required_error: 'Campo requerido' })
      .min(1, 'Ingresa un numero')
      .regex(
        new RegExp(`^3[0-9]{2}\\s?\\-?[0-9]{3}\\s?\\-?[0-9]{4}$`),
        'Ingresa un numero valido',
      )
      .transform(v => +v),
    email: z
      .string({ required_error: 'Campo requerido' })
      .email('Ingresa un email válido')
      .min(1, 'Campo requerido'),
    password: z
      .string({ required_error: 'Campo requerido' })
      .min(10, 'La contraseña debe ser al menos de 10 caracteres'),
    name: z
      .string({ required_error: 'Campo requerido' })
      .min(10, 'Nombre muy corto'),
  })
  .refine(fields => fields.password === fields.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const registerUserSchema = requestUserSchema
  .extend({
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(1, 'Campo requerido'),
    number: z.number({ required_error: 'Campo requerido' }).int().min(999999),
    email: z
      .string({ required_error: 'Campo requerido' })
      .email('Ingresa un email válido')
      .min(1, 'Campo requerido'),
    password: z
      .string({ required_error: 'Campo requerido' })
      .min(10, 'La contraseña debe ser al menos de 10 caracteres'),
    name: z
      .string({ required_error: 'Campo requerido' })
      .min(5, 'Nombre muy corto'),
  })
  .refine(fields => fields.password === fields.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
const userSchema = dbUserSchema.extend({
  id: z.string(),
});

export const loginCredentials = z.object({
  email: z
    .string({ required_error: 'Campo requerido' })
    .email('Ingresa un email válido')
    .min(1, 'Ingresa tu email'),
  password: z
    .string({ required_error: 'Campo requerido' })
    .min(1, 'Ingresa tu contraseña'),
});

export type LoginCredentials = z.infer<typeof loginCredentials>;
export type FormUserSchema = z.infer<typeof formUserSchema>;
export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
export type User = z.infer<typeof userSchema>;
