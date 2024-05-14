import { Dispatch } from "@reduxjs/toolkit";
import {
  receiptsFetchingBegin,
  receiptsFetchingSuccess,
  receiptsFetchingError,
  ReceiptData
} from "../slices/receipts";
import { faker } from "@faker-js/faker";

export const fetchReceipts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(receiptsFetchingBegin());
      setTimeout(() => {
        const data: ReceiptData[] = Array.from({ length: 107 }, () => ({
          receiptNo: faker.vehicle.vrm(),
          amount: +faker.finance.amount(5000, 1000000),
          firstName: faker.name.firstName(),
          customerEmail: faker.internet.email(),
          phone: faker.phone.number("+(234) 80# ### ####")
        }));
        dispatch(receiptsFetchingSuccess(data));
      }, 1000);
    } catch (err) {
      dispatch(receiptsFetchingError());
    }
  };
};
