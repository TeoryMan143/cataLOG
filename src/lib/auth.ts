'use server';

import { FormUserSchema, formUserSchema } from '@/core/schemas/user';

export async function resgisterUser(data: FormUserSchema) {
  const result = formUserSchema.safeParse(data);

  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach(issue => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  await new Promise(resolve => setTimeout(resolve, 2000));

  return Object.keys(zodErrors).length > 0
    ? { errors: zodErrors }
    : { success: true };
}
