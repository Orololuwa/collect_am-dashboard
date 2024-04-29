import { Dispatch } from "@reduxjs/toolkit";
import {
  productsFetchingBegin,
  productsFetchingSuccess,
  productsFetchingError,
  ProductData
} from "../slices/products";
import { faker } from "@faker-js/faker";

export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productsFetchingBegin());
      setTimeout(() => {
        const data: ProductData[] = Array.from({ length: 7 }, () => ({
          productCode: faker.vehicle.vrm(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: +faker.finance.amount(5000, 1000000, 2),
          id: faker.unique(faker.name.firstName)
        }));
        dispatch(productsFetchingSuccess(data));
      }, 1000);
    } catch (err) {
      dispatch(productsFetchingError());
    }
  };
};
