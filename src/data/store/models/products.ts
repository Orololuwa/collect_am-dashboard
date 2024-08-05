export interface ProductEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  count: number;
  businessId: number;
  status: string;
}
