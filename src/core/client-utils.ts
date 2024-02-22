import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

export const REMOTE_IMG_URL = 'https://utfs.io/f/';

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
