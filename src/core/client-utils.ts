import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

export const REMOTE_IMG_URL = 'https://utfs.io/f/';

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function formatToCOP(price: number) {
  return new Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
  }).format(price);
}

export function extractDifference<T extends { [key: string]: any }>(
  orgObj: T,
  newObj: T,
) {
  const difference: any = {};

  Object.entries(orgObj).forEach(([key, value]) => {
    const match = Object.keys(newObj).find(nKey => nKey === key);
    if (!match) return;
    if (value !== newObj[match]) {
      difference[match] = newObj[match];
    }
  });

  return difference as Partial<T>;
}

export const UNITS = [
  {
    value: 'u',
    label: 'Unidad',
  },
  {
    value: 'g',
    label: 'Gramo',
  },
  {
    value: 'lb',
    label: 'Libra',
  },
  {
    value: 'kg',
    label: 'Kilogramo',
  },
  {
    value: 'ml',
    label: 'Mililitro',
  },
  {
    value: 'l',
    label: 'Litro',
  },
  {
    value: 'm',
    label: 'Metro',
  },
] as const;

export type UnitValue = (typeof UNITS)[number]['value'];
