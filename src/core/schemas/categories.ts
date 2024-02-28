import { createInsertSchema } from 'drizzle-zod';
import { categories, productsCategories } from '../db/tables';
import { z } from 'zod';

export const dbCategorySchema = createInsertSchema(categories).extend({
  id: z.string(),
});
export const dbProductCategorySchema = createInsertSchema(productsCategories);

export type DBCategory = z.infer<typeof dbCategorySchema>;
export type DBProductCategory = z.infer<typeof dbProductCategorySchema>;
