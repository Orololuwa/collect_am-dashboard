import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReceiptData {
  receiptNo: string;
  firstName: string;
  amount: number;
  customerEmail: string;
  phone: string;
}

interface ReceiptsState {
  loading: boolean;
  data: ReceiptData[];
  error: boolean;
}

const initialState: ReceiptsState = {
  loading: false,
  data: [],
  error: false
};

const ReceiptsSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {
    receiptsFetchingBegin: (state: ReceiptsState) => {
      state.loading = true;
    },
    receiptsFetchingSuccess: (
      state: ReceiptsState,
      action: PayloadAction<ReceiptData[]>
    ) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    receiptsFetchingError: (state: ReceiptsState) => {
      state.error = true;
    }
  }
});

export const {
  receiptsFetchingBegin,
  receiptsFetchingSuccess,
  receiptsFetchingError
} = ReceiptsSlice.actions;

export default ReceiptsSlice.reducer;
