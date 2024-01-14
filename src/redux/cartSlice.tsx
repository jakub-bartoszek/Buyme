import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../pages/Cart/Cart";

const getInitialCartState = (): CartItem[] => {
 const storedCart = localStorage.getItem("cart");
 return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
 name: "cart",
 initialState: { cart: getInitialCartState() },
 reducers: {
  addToCart: (
   state,
   action: PayloadAction<{ id: number; size: string; amount: number }>
  ) => {
   const { id, size, amount } = action.payload;
   const existingProductIndex = state.cart.findIndex((item) => item.id === id);

   if (existingProductIndex !== -1) {
    // Product already in cart
    const existingSizeIndex = state.cart[existingProductIndex].sizes.findIndex(
     (s) => s.name === size
    );

    if (existingSizeIndex !== -1) {
     // Size already exists for the product, update the amount
     state.cart[existingProductIndex].sizes[existingSizeIndex].amount += amount;
    } else {
     // Size not found for the product, add a new size entry
     state.cart[existingProductIndex].sizes.push({ name: size, amount });
    }
   } else {
    // Product not in cart, add it with the size
    state.cart.push({ id, sizes: [{ name: size, amount }] });
   }

   // Save to local storage
   localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  changeAmount: (
   state,
   action: PayloadAction<{ id: number; size: string; amount: number }>
  ) => {
   const { id, size, amount } = action.payload;
   const existingProductIndex = state.cart.findIndex((item) => item.id === id);

   // Product already in cart
   const existingSizeIndex = state.cart[existingProductIndex].sizes.findIndex(
    (s) => s.name === size
   );

   if (existingSizeIndex !== -1) {
    // Size already exists for the product, update the amount
    state.cart[existingProductIndex].sizes[existingSizeIndex].amount = amount;
   } else {
    // Size not found for the product, add a new size entry
    state.cart[existingProductIndex].sizes.push({ name: size, amount });
   }

   // Save to local storage
   localStorage.setItem("cart", JSON.stringify(state.cart));
  }
 }
});

export const { addToCart, changeAmount } = cartSlice.actions;

export const selectCart = (state) => state.cartSlice.cart;

export default cartSlice.reducer;
