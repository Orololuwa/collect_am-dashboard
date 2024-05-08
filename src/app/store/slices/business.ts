import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBusinessState, IGetBusiness } from "../models/business";

const initialState: IBusinessState = {
  loading: false,
  data: null,
  error: false
};

const BusinessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    GetBusinessBegin: (state: IBusinessState) => {
      state.loading = true;
    },
    GetBusinessSuccess: (
      state: IBusinessState,
      action: PayloadAction<IGetBusiness>
    ) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    GetBusinessError: (state: IBusinessState) => {
      state.error = true;
    }
  }
});

export const { GetBusinessBegin, GetBusinessSuccess, GetBusinessError } =
  BusinessSlice.actions;

export default BusinessSlice.reducer;
