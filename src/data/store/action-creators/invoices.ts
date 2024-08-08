import { Dispatch } from "@reduxjs/toolkit";
import { GetInvoicesQueryParams } from "app/types/invoice";
import { actions } from "../slices/invoices";
import invoiceService from "data/services/invoice.service";

export const fetchInvoices = (params?: Partial<GetInvoicesQueryParams>) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.invoiceFetchingBegin());

      const { data, pagination } = await invoiceService.getInvoices({
        queryParams: params
      });
      dispatch(actions.invoiceFetchingSuccess({ data, pagination }));
    } catch (err) {
      dispatch(actions.invoiceFetchingError());
    }
  };
};

export const updateInvoiceSessionRefresh = () => {
  return (dispatch: Dispatch) => {
    dispatch(actions.updateSessionRefresh());
  };
};
