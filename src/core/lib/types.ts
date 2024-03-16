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
        | 'email-verification';
    }
  | {
      errors: { [x: string]: string }[];
      errorType: 'validation';
    }
);
