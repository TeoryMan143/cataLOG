import { db } from '@/core/db/config';
import { users } from '@/core/db/tables';
import { User } from '@/core/schemas/user';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!result) return null;
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!result) return null;
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
