import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  loading: boolean;
  data: InvoiceData[];
  error: boolean;
}

const initialState: InvoiceState = {
  loading: false,
  data: [],
  error: false
};

const InvoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    invoiceFetchingBegin: (state: InvoiceState) => {
      state.loading = true;
    },
    invoiceFetchingSuccess: (
      state: InvoiceState,
      action: PayloadAction<InvoiceData[]>
    ) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    invoiceFetchingError: (state: InvoiceState) => {
      state.error = true;
    }
  }
});

export const {
  invoiceFetchingBegin,
  invoiceFetchingSuccess,
  invoiceFetchingError
} = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
