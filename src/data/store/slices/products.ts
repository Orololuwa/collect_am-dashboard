import { RecordKey } from "@faker-js/faker/modules/unique/unique";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductData {
  productCode: string;
  title: string;
  description: string;
  price: number;
  id: RecordKey;
}

interface ProductsState {
  loading: boolean;
  data: ProductData[];
  error: boolean;
}

const initialState: ProductsState = {
  loading: false,
  data: [],
  error: false
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
      action: PayloadAction<ProductData[]>
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
