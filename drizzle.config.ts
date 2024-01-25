import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

export default {
  out: './drizzle',
  schema: './src/core/db/tables.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL! + '?sslmode=require',
  },
  verbose: true,
  strict: true,
} satisfies Config;
