import { UnitValue } from '@/app/(main)/business/[id]/_page-components/unit-selector/data';
import { relations, sql } from 'drizzle-orm';
import {
  bigint,
  boolean,
  integer,
  pgTable,
  primaryKey,
  real,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

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
    emailVerified: boolean('email_verified').default(false),
    image: text('image'),
  },
  users => {
    return {
      emailIdx: uniqueIndex('email_idx').on(users.email),
    };
  },
);

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const emailVerification = pgTable('email_verification', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  sentAt: timestamp('sent_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const oauthAccounts = pgTable(
  'oauth_account',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: text('provider').notNull().$type<'google'>(),
    providerUserId: text('provider_user_id').notNull(),
    accessToken: text('access_token').notNull(),
    refreshToken: text('refresh_token'),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }),
  },
  oauth => ({
    providerUserIdIxd: uniqueIndex('provider_user_id_ixd').on(
      oauth.providerUserId,
    ),
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
      .references(() => users.id, { onDelete: 'cascade' }),
    image: text('image').notNull(),
    banner: text('banner').notNull(),
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
  businessId: uuid('business_id')
    .notNull()
    .references(() => businesses.id),
});

export const products = pgTable('product', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  displayName: text('display_name').notNull(),
  price: real('price').notNull(),
  unit: text('unit').notNull().$type<UnitValue>(),
  description: text('description').notNull(),
  avialableUnits: integer('avialable_units').notNull(),
  businessId: uuid('business_id')
    .notNull()
    .references(() => businesses.id, { onDelete: 'cascade' }),
  rating: real('rating').notNull().default(0),
});

export const cart = pgTable(
  'cart',
  {
    accountId: uuid('account_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    itemId: uuid('item_id')
      .notNull()
      .references(() => cartItems.id, { onDelete: 'cascade' }),
  },
  c => ({
    compoundKey: primaryKey({ columns: [c.accountId, c.itemId] }),
  }),
);

export const cartItems = pgTable('cart_item', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  displayName: text('display_name').notNull(),
  price: real('price').notNull(),
  amount: integer('amount').notNull(),
  unit: text('unit').notNull().$type<UnitValue>(),
  productId: uuid('product_id').references(() => products.id, {
    onDelete: 'set null',
  }),
});

export const productsRating = pgTable(
  'product_rating',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    rate: smallint('rate').notNull(),
  },
  pr => ({
    compoundKey: primaryKey({ columns: [pr.productId, pr.userId] }),
  }),
);

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

//* Relations

export const businessSocialRelations = relations(businessSocial, ({ one }) => ({
  business: one(businesses, {
    fields: [businessSocial.businessId],
    references: [businesses.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  productsCategories: many(productsCategories),
}));

export const productsRelations = relations(products, ({ many }) => ({
  categories: many(productsCategories),
  images: many(productImages),
  ratings: many(productsRating),
  items: many(cartItems)
}));

export const cartRelations = relations(cart, ({ one }) => ({
  item: one(cartItems, {
    fields: [cart.itemId],
    references: [cartItems.id],
  }),
  account: one(users, {
    fields: [cart.accountId],
    references: [users.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ many, one }) => ({
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
  cart: many(cart),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

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

export const oauthRelations = relations(oauthAccounts, ({ one }) => ({
  user: one(users, {
    fields: [oauthAccounts.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  ratings: many(productsRating),
}));

export const productsRatingRelations = relations(productsRating, ({ one }) => ({
  product: one(products, {
    references: [products.id],
    fields: [productsRating.productId],
  }),
  user: one(users, {
    references: [users.id],
    fields: [productsRating.userId],
  }),
}));
