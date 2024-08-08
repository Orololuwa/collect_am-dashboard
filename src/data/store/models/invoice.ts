import { CustomerEntity } from "./customers";

export interface InvoiceEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  code: string;
  description: string;
  dueDate: string;
  price: number;
  status: string;
  tax: number;
  serviceCharge: number;
  discount: number;
  discountType: string;
  total: number;
  businessId: number;
  listedProducts: ListedProductEntity[];
  customerId: number;
  customer: CustomerEntity;
}

export interface ListedProductEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  priceListed: number;
  quantityListed: number;
  invoiceId: number;
  productId: number;
}
