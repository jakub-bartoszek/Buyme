import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../App";

interface ProductsState {
 productsSlice: {
  products: Product[];
  status: string;
 };
}

const productsSlice = createSlice({
 name: "products",
 initialState: {
  products: [],
  status: "loading"
 },
 reducers: {
  fetchProducts: () => {},
  setProducts: (state, { payload }) => {
   state.products = payload;
  },
  setProductsStatus: (state, { payload }) => {
   state.status = payload;
  }
 }
});

export const { fetchProducts, setProducts, setProductsStatus } = productsSlice.actions;

export const selectProducts = (state: ProductsState) => state.productsSlice.products;
export const selectProductsStatus = (state: ProductsState) => state.productsSlice.status;

export default productsSlice.reducer;
