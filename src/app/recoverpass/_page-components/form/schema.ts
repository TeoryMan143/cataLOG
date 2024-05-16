import { z } from 'zod';

export const newPasswordSchema = z.object({
  password: z
    .string({ required_error: 'Campo requerido' })
    .min(10, 'La contraseña debe ser al menos de 10 caracteres'),
  confirmPassword: z
    .string({ required_error: 'Campo requerido' })
    .min(1, 'Campo requerido'),
});

export type NewPassword = z.infer<typeof newPasswordSchema>;
