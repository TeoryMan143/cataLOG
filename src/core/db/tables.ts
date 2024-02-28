import { relations, sql } from 'drizzle-orm';
import {
  bigint,
  integer,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';

export const users = pgTable(
  'user',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    number: bigint('number', { mode: 'number' }).notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
  },
  users => {
    return {
      emailIdx: uniqueIndex('email_idx').on(users.email),
    };
  },
);

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  vt => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const businesses = pgTable(
  'business',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    name: text('name').notNull(),
    nit: text('nit').notNull(),
    address: text('address').notNull().unique(),
    accountId: uuid('account_id')
      .notNull()
      .references(() => users.id, {onDelete: 'cascade'}),
    image: text('image').notNull(),
    banner: text('banner').notNull(),
    socialId: uuid('social_id').references(() => businessSocial.id),
  },
  bs => ({
    nitIdx: uniqueIndex('nit_idx').on(bs.nit),
  }),
);

export const businessSocial = pgTable('business_social', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  instagram: text('instagram'),
  facebook: text('facebook'),
  whatsapp: text('whatsapp'),
  webPage: text('web_page'),
  businessId: uuid('business_id').notNull(),
});

export const businessSocialRelations = relations(businessSocial, ({ one }) => ({
  business: one(businesses, {
    fields: [businessSocial.businessId],
    references: [businesses.id],
  }),
}));

export const products = pgTable('product', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  displayName: text('display_name').notNull(),
  price: real('price').notNull(),
  description: text('description').notNull(),
  avialableUnits: integer('avialable_units').notNull(),
  businessId: uuid('business_id')
    .notNull()
    .references(() => businesses.id, { onDelete: 'cascade' }),
});

export const productsRelations = relations(products, ({ many }) => ({
  productsCategories: many(productsCategories),
  images: many(productImages),
}));

export const productImages = pgTable('product_image', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  image: text('image').notNull(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
});

export const categories = pgTable('category', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: text('name').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  productsCategories: many(productsCategories),
}));

export const productsCategories = pgTable(
  'product_categories',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  pc => ({
    compoundKey: primaryKey({ columns: [pc.categoryId, pc.productId] }),
  }),
);

export const productsCategoriesRelations = relations(
  productsCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productsCategories.productId],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productsCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
