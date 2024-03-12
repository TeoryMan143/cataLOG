import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { productImages, products } from '../db/tables';
import { z } from 'zod';

export const dbProductSchema = createInsertSchema(products).extend({
  id: z.string(),
});
export const requestProductSchema = dbProductSchema
  .omit({
    id: true,
  })
  .extend({
    categories: z.string().array().optional(),
    price: z
      .number({ invalid_type_error: 'Añade un precio' })
      .min(50, 'Minimo $50'),
    avialableUnits: z
      .number({ invalid_type_error: 'Añade una cantidad' })
      .min(1, 'Debes agregar al menos una unidad'),
    description: z.string().trim().min(1, 'Añade una descripción'),
    displayName: z.string().trim().min(1, 'Añade un nombre'),
    images: z.string().array(),
  });

export const editProductSchema = requestProductSchema.extend({
  categories: z.string().array(),
  price: z
    .number({ invalid_type_error: 'Añade un precio' })
    .min(50, 'Minimo $50')
    .optional(),
  avialableUnits: z
    .number({ invalid_type_error: 'Añade una cantidad' })
    .min(1, 'Debes agregar al menos una unidad')
    .optional(),
  description: z.string().trim().min(1, 'Añade una descripción').optional(),
  displayName: z.string().trim().min(1, 'Añade un nombre').optional(),
  images: z.string().array(),
  deleteImages: z.string().array().optional(),
});

export const registerProductSchema = requestProductSchema.omit({
  categories: true,
  images: true,
});
export const formProductSchema = registerProductSchema.omit({
  businessId: true,
});

export type FormProduct = z.infer<typeof formProductSchema>;
export type RegisterProduct = z.infer<typeof registerProductSchema>;
export type RequestProduct = z.infer<typeof requestProductSchema>;
export type EditProduct = z.infer<typeof editProductSchema>
export type DBProduct = z.infer<typeof dbProductSchema>;

export const productImageSchema = createSelectSchema(productImages);

export type DBProductImage = z.infer<typeof productImageSchema>;
