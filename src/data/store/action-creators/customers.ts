import { Dispatch } from "@reduxjs/toolkit";
import {
  customersFetchingBegin,
  customersFetchingSuccess,
  customersFetchingError,
  CustomerData
} from "../slices/customers";
import { faker } from "@faker-js/faker";

export const fetchcustomers = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(customersFetchingBegin());
      setTimeout(() => {
        const data: CustomerData[] = Array.from({ length: 7 }, () => ({
          customerNo: faker.vehicle.vrm(),
          firstName: faker.name.firstName(),
          lastName: faker.name.firstName(),
          customerEmail: faker.internet.email(),
          phone: faker.phone.number("+(234) 80# ### ####")
        }));
        dispatch(customersFetchingSuccess(data));
      }, 1000);
    } catch (err) {
      dispatch(customersFetchingError());
    }
  };
};
