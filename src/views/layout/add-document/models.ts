import { ProductData } from "data/store/slices/products";

export interface ProductDataProps extends ProductData {
  quantity: number;
  total: number;
}

export enum AddOnsKeys {
  ONE = "tax",
  TWO = "discount",
  THREE = "serviceCharge"
}

export type AddOnsProps = {
  [key in AddOnsKeys]: {
    checked: boolean;
    percentage: number;
    amount: number;
  };
};
