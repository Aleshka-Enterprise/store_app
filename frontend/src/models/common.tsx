export interface Page<T> {
  next: null | string;
  previous: null | string;
  count: number;
  results: T[];
}