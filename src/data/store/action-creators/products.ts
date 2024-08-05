import { Dispatch } from "@reduxjs/toolkit";
import {
  productsFetchingBegin,
  productsFetchingSuccess,
  productsFetchingError
} from "../slices/products";
import productsService from "data/services/products.service";
import { GetProductsQueryParams } from "app/types/products";

export const fetchProducts = (params?: GetProductsQueryParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productsFetchingBegin());

      const { data } = await productsService.getProducts({
        queryParams: params
      });
      dispatch(productsFetchingSuccess(data));
    } catch (err) {
      dispatch(productsFetchingError());
    }
  };
};
