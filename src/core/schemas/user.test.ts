import { describe, it, expect } from 'vitest';
import { FormUserSchema, formUserSchema } from './user';

describe('User schema', () => {
  it('show positive result', () => {
    const data: FormUserSchema = {
      name: 'Alberto Boneli',
      email: 'alberto@gmail.com',
      number: 3189901202,
      password: 'imcsisas123',
      confirmPassword: 'imcsisas123',
    };

    const result = formUserSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  it('password mismatch', () => {
    const data: FormUserSchema = {
      name: 'Alberto Boneli',
      email: 'alberto@gmail.com',
      number: 3189901202,
      password: 'imcsisas123',
      confirmPassword: 'lol',
    };

    const result = formUserSchema.safeParse(data);

    expect(result.success).toBe(false);
  });
});
