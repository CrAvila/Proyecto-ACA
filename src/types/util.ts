export type Loadable<T> = {
  isLoading: boolean;
  data: T;
};

export type FieldChange<T extends Record<string, unknown>, K extends keyof T> = {
  key: K;
  value: T[K];
};
