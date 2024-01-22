import { FieldError } from 'react-hook-form';

export type ResgisterInputs = {
  name: 'number' | 'email' | 'name' | 'password' | 'confirmPassword';
  icon?: React.ReactElement<React.ComponentProps<'svg'>>;
  placeholder: string;
  error?: FieldError;
  password?: boolean;
};
