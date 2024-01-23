export type ActionResponse<T = undefined> = {
  errors?: string[];
  errorType?: 'validation' | 'insertion' | 'duplicated-email';
  success: boolean;
  result?: T;
};
