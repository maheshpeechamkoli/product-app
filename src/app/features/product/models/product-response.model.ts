export interface ProductResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}
