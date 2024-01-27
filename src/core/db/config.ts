import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as tables from './tables';

export const db = drizzle(sql, { schema: tables });
