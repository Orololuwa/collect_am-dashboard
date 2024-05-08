import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ExpirySession from "app/utils/expirysession";

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!ExpirySession.get("access_token"),
  loading: false,
  error: false
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginBegin: (state: AuthState) => {
      state.loading = true;
    },
    loginError: (state: AuthState) => {
      state.loading = false;
      state.error = true;
    },
    loginSuccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isLoggedIn = action.payload;
      state.error = false;
    },
    logoutBegin: (state: AuthState) => {
      state.loading = true;
    },
    logoutError: (state: AuthState) => {
      state.loading = false;
      state.error = true;
    },
    logoutSuccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isLoggedIn = action.payload;
      state.error = false;
    }
  }
});

export const {
  loginBegin,
  loginError,
  loginSuccess,
  logoutBegin,
  logoutError,
  logoutSuccess
} = AuthSlice.actions;

export default AuthSlice.reducer;
