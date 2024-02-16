import { createInsertSchema } from 'drizzle-zod';
import { businesses } from '../db/tables';
import { z } from 'zod';

export const dbBusinessSchema = createInsertSchema(businesses);
export const registerBusinessSchema = dbBusinessSchema.omit({ id: true });
export const formBusinessSchema = registerBusinessSchema.omit({
  accountId: true,
});

export type FormBusiness = z.infer<typeof formBusinessSchema>;
