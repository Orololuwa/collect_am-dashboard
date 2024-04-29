import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./slices/auth";
import UI from "./slices/ui";
import invoices from "./slices/invoices";
import products from "./slices/products";
import receipts from "./slices/receipts";
import customers from "./slices/customers";
import reports from "./slices/reports";

const rootReducer = combineReducers({
  auth,
  UI,
  invoices,
  products,
  receipts,
  customers,
  reports
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
