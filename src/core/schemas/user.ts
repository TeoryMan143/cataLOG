import { createInsertSchema } from 'drizzle-zod';
import { users } from '../db/tables';
import { string, z } from 'zod';

export const dbUserSchema = createInsertSchema(users);
export const requestUserSchema = dbUserSchema.omit({ id: true });
export const formUserSchema = requestUserSchema
  .extend({
    confirmPassword: z.string({ required_error: 'Campo requerido' }),
    number: z
      .number({ required_error: 'Campo requerido' })
      .int('Ingresa un numero válido')
      .min(3000000000)
      .max(3000000000),
    email: z
      .string({ required_error: 'Campo requerido' })
      .email('Ingresa un email válido'),
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
const userSchema = dbUserSchema.extend({
  id: z.string(),
});

export type FormUserSchema = z.infer<typeof formUserSchema>;
export type User = z.infer<typeof userSchema>;
