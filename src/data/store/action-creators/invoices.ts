import { Dispatch } from "@reduxjs/toolkit";
import {
  invoiceFetchingBegin,
  invoiceFetchingSuccess,
  invoiceFetchingError,
  InvoiceData
} from "../slices/invoices";
import { faker } from "@faker-js/faker";

export const fetchInvoices = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(invoiceFetchingBegin());
      setTimeout(() => {
        const data: InvoiceData[] = Array.from({ length: 2000 }, () => ({
          invoiceNo: faker.vehicle.vrm(),
          customerName: faker.person.fullName(),
          customerEmail: faker.internet.email(),
          amount: +faker.finance.amount(5000, 1000000),
          dueDate: faker.date.future(),
          dateSent: faker.date.recent(),
          status: "pending",
          house: "7458"
        }));
        dispatch(invoiceFetchingSuccess(data));
      }, 1000);
    } catch (err) {
      dispatch(invoiceFetchingError());
    }
  };
};
