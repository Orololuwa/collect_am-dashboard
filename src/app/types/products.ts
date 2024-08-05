export interface GetProductsQueryParams {
  page: number;
  pageSize: number;
  code: string;
}

export interface CreateProductBody {
  name: string;
  code: string;
  description: string;
  price: number;
  category: string;
  count: number;
}

export type UpdateProductBody = Partial<CreateProductBody>;
