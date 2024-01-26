import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../App";

interface ProductsState {
 productsSlice: {
  products: Product[];
 };
}

const productsSlice = createSlice({
 name: "products",
 initialState: {
  products: []
 },
 reducers: {
  fetchProducts: () => {},
  setProducts: (state, { payload }) => {
   state.products = payload;
  }
 }
});

export const { setProducts, fetchProducts } = productsSlice.actions;

export const selectProducts = (state: ProductsState) =>
 state.productsSlice.products;

export default productsSlice.reducer;
