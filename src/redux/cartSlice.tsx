import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../pages/Cart/Cart";

const getInitialCartState = (): CartItem[] => {
 const storedCart = localStorage.getItem("cart");
 return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
 name: "cart",
 initialState: getInitialCartState(),
 reducers: {
  addToCart: (
   state,
   action: PayloadAction<{ id: number; size: string; amount: number }>
  ) => {
   const { id, size, amount } = action.payload;
   const existingProductIndex = state.findIndex((item) => item.id === id);

   if (existingProductIndex !== -1) {
    // Product already in cart
    const existingSizeIndex = state[existingProductIndex].sizes.findIndex(
     (s) => s.name === size
    );

    if (existingSizeIndex !== -1) {
     // Size already exists for the product, update the amount
     state[existingProductIndex].sizes[existingSizeIndex].amount += amount;
    } else {
     // Size not found for the product, add a new size entry
     state[existingProductIndex].sizes.push({ name: size, amount });
    }
   } else {
    // Product not in cart, add it with the size
    state.push({ id, sizes: [{ name: size, amount }] });
   }

   // Save to local storage
   localStorage.setItem("cart", JSON.stringify(state));
  }
  // ... (other reducers)
 }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
