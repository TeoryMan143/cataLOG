import { FieldError } from 'react-hook-form';

export interface ResgisterInputs
  extends React.ComponentPropsWithoutRef<'input'> {
  name: 'number' | 'email' | 'name' | 'password' | 'confirmPassword';
  icon?: React.ReactElement<React.ComponentProps<'svg'>>;
  error?: FieldError;
}
