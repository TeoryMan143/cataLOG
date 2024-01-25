import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { hashSync, genSaltSync } from 'bcrypt';

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function hashPassword(password: string) {
  return hashSync(password, genSaltSync());
}
