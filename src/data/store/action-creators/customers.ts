import { Dispatch } from "@reduxjs/toolkit";
import { GetCustomerQueryParams } from "app/types/customer";
import { actions } from "../slices/customers";
import customerService from "data/services/customer.service";

export const fetchCustomers = (params?: Partial<GetCustomerQueryParams>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.customersFetchingBegin());

      const { data, pagination } = await customerService.getCustomers({
        queryParams: params
      });
      dispatch(actions.customersFetchingSuccess({ data, pagination }));
    } catch (err) {
      dispatch(actions.customersFetchingError());
    }
  };
};

export const updateCustomerSessionRefresh = () => {
  return (dispatch: Dispatch) => {
    dispatch(actions.updateSessionRefresh());
  };
};
