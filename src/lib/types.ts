export type ActionResponse<T = undefined> = {
  errors?: string[];
  errorType?: 'validation' | 'insertion' | 'duplicated-email' | 'auth';
  success: boolean;
  result?: T;
};
