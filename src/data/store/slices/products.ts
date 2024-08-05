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
  loading: boolean;
  data: ProductEntity[];
  pagination: IPagination;
  error: boolean;
}

const initialState: ProductsState = {
  loading: false,
  data: [],
  error: false,
  pagination: initPaginationState
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsFetchingBegin: (state: ProductsState) => {
      state.loading = true;
    },
    productsFetchingSuccess: (
      state: ProductsState,
      action: PayloadAction<ProductEntity[]>
    ) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    productsFetchingError: (state: ProductsState) => {
      state.error = true;
    }
  }
});

export const {
  productsFetchingBegin,
  productsFetchingSuccess,
  productsFetchingError
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
