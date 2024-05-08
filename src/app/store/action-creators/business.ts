import { Dispatch } from "@reduxjs/toolkit";
import {
  GetBusinessBegin,
  GetBusinessError,
  GetBusinessSuccess
} from "../slices/business";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "data/config";
import toast from "react-hot-toast";
import businessService from "data/services/business.service";

export const fetchBusiness = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(GetBusinessBegin());
      const res = await businessService.getBusiness();
      dispatch(GetBusinessSuccess(res.data));
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message || DEFAULT_ERROR_MESSAGE;
      toast.error(msg);
      dispatch(GetBusinessError());
    }
  };
};
