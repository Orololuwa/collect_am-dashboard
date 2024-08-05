import { Dispatch } from "@reduxjs/toolkit";
import {
  productsFetchingBegin,
  productsFetchingSuccess,
  productsFetchingError,
  actions
} from "../slices/products";
import productsService from "data/services/products.service";
import { GetProductsQueryParams } from "app/types/products";

export const fetchProducts = (params?: Partial<GetProductsQueryParams>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productsFetchingBegin());

      const { data, pagination } = await productsService.getProducts({
        queryParams: params
      });
      dispatch(productsFetchingSuccess({ data, pagination }));
    } catch (err) {
      dispatch(productsFetchingError());
    }
  };
};

export const updateNewProductSession = () => {
  return (dispatch: Dispatch) => {
    dispatch(actions.updateNewProductSession());
  };
};
