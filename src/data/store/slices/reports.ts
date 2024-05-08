import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReportData {
  documentNo: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  dateSent: Date;
  status: string;
}

interface ReportsState {
  loading: boolean;
  data: ReportData[];
  error: boolean;
}

const initialState: ReportsState = {
  loading: false,
  data: [],
  error: false
};

const ReportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reportsFetchingBegin: (state: ReportsState) => {
      state.loading = true;
    },
    reportsFetchingSuccess: (
      state: ReportsState,
      action: PayloadAction<ReportData[]>
    ) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    reportsFetchingError: (state: ReportsState) => {
      state.error = true;
    }
  }
});

export const {
  reportsFetchingBegin,
  reportsFetchingSuccess,
  reportsFetchingError
} = ReportsSlice.actions;

export default ReportsSlice.reducer;
