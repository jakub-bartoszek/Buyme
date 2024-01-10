import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
 name: "products",
 initialState: {
  products: []
 },
 reducers: {
  setProducts: (state, { payload }) => {
   state.products = payload;
  }
 }
});

export const { setProducts } = productsSlice.actions;

export const selectProducts = (state) => state.productsSlice.products;

export default productsSlice.reducer;
