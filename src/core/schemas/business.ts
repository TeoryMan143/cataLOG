import { createInsertSchema } from 'drizzle-zod';
import { businesses } from '../db/tables';
import { z } from 'zod';

export const dbBusinessSchema = createInsertSchema(businesses);
export const registerBusinessSchema = dbBusinessSchema
  .omit({ id: true })
  .extend({
    nit: z
      .string()
      .regex(new RegExp(`^\\d{4,}(\\.\\d+)?-\\d$`), 'Ingresa un NIT valido'),
  });
export const formBusinessSchema = registerBusinessSchema.omit({
  accountId: true,
});

export type FormBusiness = z.infer<typeof formBusinessSchema>;
export type RegisterBusiness = z.infer<typeof registerBusinessSchema>;
export type DBBusiness = z.infer<typeof dbBusinessSchema>;
