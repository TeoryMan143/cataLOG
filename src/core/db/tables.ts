import { sql } from 'drizzle-orm';
import {
  bigint,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    number: bigint('number', { mode: 'number' }).notNull(),
  },
  users => {
    return {
      emailIdx: uniqueIndex('email_idx').on(users.email),
    };
  }
);
