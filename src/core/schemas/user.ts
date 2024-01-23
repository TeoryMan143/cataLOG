import { createInsertSchema } from 'drizzle-zod';
import { users } from '../db/tables';
import { z } from 'zod';

export const dbUserSchema = createInsertSchema(users);
export const requestUserSchema = dbUserSchema.omit({ id: true });
export const formUserSchema = requestUserSchema
  .extend({
    confirmPassword: z.string({ required_error: 'Campo requerido' }),
    number: z
      .string({ required_error: 'Campo requerido' })
      .regex(
        new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
        'Introduce un numero valido'
      ),
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
export const formUserSchemaValidator = formUserSchema.transform(user => {
  const { confirmPassword, ...otherProps } = user;
  return otherProps;
});

export type FormUserSchema = z.infer<typeof formUserSchema>;
