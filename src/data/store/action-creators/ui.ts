import { Dispatch } from "@reduxjs/toolkit";
import { toggleShow } from "../slices/ui";

export const toggleSideBar = () => {
  return (dispatch: Dispatch) => {
    dispatch(toggleShow());
  };
};
