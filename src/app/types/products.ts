import { PageQuery } from ".";

export interface GetProductsQueryParams extends PageQuery {
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
