import { createSelectSchema } from 'drizzle-zod';
import { cartItems } from '../db/tables';
import { z } from 'zod';

const dbCartItem = createSelectSchema(cartItems);

export type DBCartItem = z.infer<typeof dbCartItem>;
