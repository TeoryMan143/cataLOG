export const units = [
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

export type UnitValue = (typeof units)[number]['value'];
