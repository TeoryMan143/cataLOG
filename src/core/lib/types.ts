export type ActionResponse<T = undefined> = ActionSuccess<T> | ActionError;

export type ActionSuccess<T> = {
  success: true;
  result: T;
};

export type ActionError = {
  success: false;
  errors: string[];
  errorType: 'validation' | 'insertion' | 'duplicated-email' | 'auth';
};
