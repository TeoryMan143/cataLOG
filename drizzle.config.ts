import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

const connectionString = (process.env.POSTGRES_URL = process.env.DG_URL);

export default {
  out: './drizzle',
  schema: './src/core/db/tables.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: connectionString! + '?sslmode=require',
  },
  verbose: true,
  strict: true,
} satisfies Config;
