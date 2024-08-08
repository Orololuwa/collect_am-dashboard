import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceEntity } from "../models/invoice";
import { initPaginationState, IPagination } from "../models/shared";

export interface InvoiceData {
  invoiceNo: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  dueDate: Date;
  dateSent: Date;
  status: string;
}

interface InvoiceState {
  all: {
    loading: boolean;
    data: InvoiceEntity[];
    pagination: IPagination;
    error: boolean;
  };
  session: {
    refreshCount: number;
  };
}

const initialState: InvoiceState = {
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

const InvoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    invoiceFetchingBegin: (state: InvoiceState) => {
      state.all.loading = true;
    },
    invoiceFetchingSuccess: (
      state: InvoiceState,
      action: PayloadAction<{ data: InvoiceEntity[]; pagination: IPagination }>
    ) => {
      state.all.data = action.payload.data;
      state.all.pagination = action.payload.pagination;
      state.all.loading = false;
      state.all.error = false;
    },
    invoiceFetchingError: (state: InvoiceState) => {
      state.all.error = true;
    },
    updateSessionRefresh: (state: InvoiceState) => {
      state.session.refreshCount++;
    }
  }
});

export const {
  invoiceFetchingBegin,
  invoiceFetchingSuccess,
  invoiceFetchingError
} = InvoiceSlice.actions;
export const actions = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
