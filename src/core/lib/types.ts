export type ActionResponse<T = undefined> = ActionSuccess<T> | ActionError;

export type ActionSuccess<T> = {
  success: true;
  result: T;
};

export type ActionError = {
  success: false;
} & (
  | {
      errors: string[];
      errorType:
        | 'insertion'
        | 'duplicated-email'
        | 'auth'
        | 'email-verification'
        | 'token-validation'
        | 'unknown';
    }
  | {
      errors: { [x: string]: string }[];
      errorType: 'validation';
    }
);

export interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}
