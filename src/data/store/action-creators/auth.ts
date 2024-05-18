import { Dispatch } from "@reduxjs/toolkit";
import {
  loginBegin,
  loginError,
  loginSuccess,
  logoutBegin,
  logoutError,
  logoutSuccess
} from "../slices/auth";
import { NavigateFunction } from "react-router-dom";
import { LoginRequestBody } from "../models/auth";
import toast from "react-hot-toast";
import ExpirySession from "app/utils/expirysession";
import authService from "data/services/auth.service";

export const login = (
  navigate: NavigateFunction,
  from: string,
  body: LoginRequestBody,
  rememberMe: boolean
) => {
  return async (dispatch: Dispatch) => {
    try {
      const expirationInSeconds = rememberMe ? 86400 : 1800;
      dispatch(loginBegin());
      const res = await authService.login(body);

      // if (res.status === 200) {
      dispatch(loginSuccess(true));
      navigate(from, { replace: true });
      ExpirySession.set(
        "access_token",
        res.data.data.token,
        expirationInSeconds
      );
      // }
    } catch (error: any) {
      dispatch(loginError());
      if (error.response) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          error.response.data.error.map((err: { message: string }) =>
            toast.error(err.message, {
              duration: 5000
            })
          );
        } else {
          toast.error("Error");
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        toast.error(error.message);
      }
    }
  };
};

export const logOut = (navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(logoutBegin());
      dispatch(logoutSuccess(false));
      navigate("/login", { replace: true });
    } catch (err) {
      dispatch(logoutError());
    }
  };
};
