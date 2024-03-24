import { z } from 'zod';

export const formBusinessSocialSchema = z.object({
  instagram: z.string(),
  facebook: z.string(),
  webPage: z.union([
    z.string().url({ message: 'Url invalido' }),
    z.string().length(0),
  ]),
  whatsapp: z.union([
    z
      .string()
      .regex(
        new RegExp(`^3[0-9]{2}\\s?\\-?[0-9]{3}\\s?\\-?[0-9]{4}$`),
        'Ingresa un numero valido',
      ),
    z.string().length(0),
  ]),
});

export const requestBusinessSocialSchema = z.object({
  businessId: z.string(),
  instagram: z.string().nullable(),
  facebook: z.string().nullable(),
  webPage: z.string().url({ message: 'Url invalido' }).nullable(),
  whatsapp: z
    .string()
    .regex(
      new RegExp(`^3[0-9]{2}\\s?\\-?[0-9]{3}\\s?\\-?[0-9]{4}$`),
      'Ingresa un numero valido',
    )
    .nullable(),
});

export type FormBusinessSocial = z.infer<typeof formBusinessSocialSchema>;
export type RequestBusinessSocial = z.infer<typeof requestBusinessSocialSchema>;
