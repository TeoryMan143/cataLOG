import { createSelectSchema } from 'drizzle-zod';
import { payments } from '../db/tables';
import { z } from 'zod';

export const dbPaymentSchema = createSelectSchema(payments);

export type DBPayment = z.infer<typeof dbPaymentSchema>;
