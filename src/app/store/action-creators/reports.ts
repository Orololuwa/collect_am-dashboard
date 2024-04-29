import { Dispatch } from "@reduxjs/toolkit";
import {
  reportsFetchingBegin,
  reportsFetchingSuccess,
  reportsFetchingError,
  ReportData
} from "../slices/reports";
import { faker } from "@faker-js/faker";

export const fetchReports = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(reportsFetchingBegin());
      setTimeout(() => {
        const data: ReportData[] = Array.from({ length: 47 }, () => ({
          documentNo: faker.vehicle.vrm(),
          customerName: faker.name.findName(),
          customerEmail: faker.internet.email(),
          amount: +faker.finance.amount(5000, 1000000),
          dueDate: faker.date.future(),
          dateSent: faker.date.recent(),
          status: "pending"
        }));
        dispatch(reportsFetchingSuccess(data));
      }, 1000);
    } catch (err) {
      dispatch(reportsFetchingError());
    }
  };
};
