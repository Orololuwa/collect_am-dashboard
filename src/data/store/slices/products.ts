import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductEntity } from "../models/products";
import { initPaginationState, IPagination } from "../models/shared";

export interface ProductData {
  productCode: string;
  title: string;
  description: string;
  price: number;
  id: any;
}

interface ProductsState {
  all: {
    loading: boolean;
    data: ProductEntity[];
    pagination: IPagination;
    error: boolean;
  };
  session: {
    newProductCount: number;
  };
}

const initialState: ProductsState = {
  all: {
    loading: false,
    data: [],
    error: false,
    pagination: initPaginationState
  },
  session: {
    newProductCount: 0
  }
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsFetchingBegin: (state: ProductsState) => {
      state.all.loading = true;
    },
    productsFetchingSuccess: (
      state: ProductsState,
      action: PayloadAction<{ data: ProductEntity[]; pagination: IPagination }>
    ) => {
      state.all.data = action.payload.data;
      state.all.pagination = action.payload.pagination;
      state.all.loading = false;
      state.all.error = false;
    },
    productsFetchingError: (state: ProductsState) => {
      state.all.error = true;
    },
    updateNewProductSession: (state: ProductsState) => {
      state.session.newProductCount++;
    }
  }
});

export const {
  productsFetchingBegin,
  productsFetchingSuccess,
  productsFetchingError
} = ProductsSlice.actions;
export const actions = ProductsSlice.actions;

export default ProductsSlice.reducer;
