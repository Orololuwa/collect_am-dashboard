import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerData {
  customerNo: string;
  firstName: string;
  lastName: string;
  customerEmail: string;
  phone: string;
}

interface CustomersState {
  loading: boolean;
  data: CustomerData[];
  error: boolean;
}

const initialState: CustomersState = {
  loading: false,
  data: [],
  error: false
};

const CustomersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customersFetchingBegin: (state: CustomersState) => {
      state.loading = true;
    },
    customersFetchingSuccess: (
      state: CustomersState,
      action: PayloadAction<CustomerData[]>
    ) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    customersFetchingError: (state: CustomersState) => {
      state.error = true;
    }
  }
});

export const {
  customersFetchingBegin,
  customersFetchingSuccess,
  customersFetchingError
} = CustomersSlice.actions;

export default CustomersSlice.reducer;
