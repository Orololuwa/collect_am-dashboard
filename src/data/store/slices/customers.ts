import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerEntity } from "../models/customers";
import { initPaginationState, IPagination } from "../models/shared";

export interface CustomerData {
  customerNo: string;
  firstName: string;
  lastName: string;
  customerEmail: string;
  phone: string;
}

interface CustomersState {
  all: {
    loading: boolean;
    data: CustomerEntity[];
    pagination: IPagination;
    error: boolean;
  };
  session: {
    refreshCount: number;
  };
}

const initialState: CustomersState = {
  all: {
    loading: false,
    data: [],
    error: false,
    pagination: initPaginationState
  },
  session: {
    refreshCount: 0
  }
};

const CustomersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customersFetchingBegin: (state: CustomersState) => {
      state.all.loading = true;
    },
    customersFetchingSuccess: (
      state: CustomersState,
      action: PayloadAction<{ data: CustomerEntity[]; pagination: IPagination }>
    ) => {
      state.all.data = action.payload.data;
      state.all.pagination = action.payload.pagination;
      state.all.loading = false;
      state.all.error = false;
    },
    customersFetchingError: (state: CustomersState) => {
      state.all.error = true;
    },
    updateSessionRefresh: (state: CustomersState) => {
      state.session.refreshCount++;
    }
  }
});

export const actions = CustomersSlice.actions;

export default CustomersSlice.reducer;
