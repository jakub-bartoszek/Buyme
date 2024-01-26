import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../pages/Cart/Cart";

const getInitialCartState = (): CartItem[] => {
 const storedCart = localStorage.getItem("cart");
 return storedCart ? JSON.parse(storedCart) : [];
};

const updateLocalStorage = (cart: CartItem[]) => {
 localStorage.setItem("cart", JSON.stringify(cart));
};

const findProductIndex = (cart: CartItem[], productId: number) =>
 cart.findIndex((item) => item.id === productId);

const findSizeIndex = (
 sizes: { name: string; amount: number }[],
 size: string
) => sizes.findIndex((s) => s.name === size);

interface CartState {
 cartSlice: {
  cart: CartItem[];
 };
}

const cartSlice = createSlice({
 name: "cart",
 initialState: { cart: getInitialCartState() },
 reducers: {
  addToCart: (
   state,
   action: PayloadAction<{ id: number; size: string; amount: number }>
  ) => {
   const { id, size, amount } = action.payload;
   const productIndex = findProductIndex(state.cart, id);

   if (productIndex !== -1) {
    const sizeIndex = findSizeIndex(state.cart[productIndex].sizes, size);

    if (sizeIndex !== -1) {
     state.cart[productIndex].sizes[sizeIndex].amount += amount;
    } else {
     state.cart[productIndex].sizes.push({ name: size, amount });
    }
   } else {
    state.cart.push({ id, sizes: [{ name: size, amount }] });
   }

   updateLocalStorage(state.cart);
  },
  changeAmount: (
   state,
   action: PayloadAction<{ id: number; size: string; amount: number }>
  ) => {
   const { id, size, amount } = action.payload;
   const productIndex = findProductIndex(state.cart, id);

   const sizeIndex = findSizeIndex(state.cart[productIndex].sizes, size);

   if (amount === 0) {
    if (sizeIndex !== -1) {
     state.cart[productIndex].sizes.splice(sizeIndex, 1);
    }
   } else {
    if (sizeIndex !== -1) {
     state.cart[productIndex].sizes[sizeIndex].amount = amount;
    } else {
     state.cart[productIndex].sizes.push({ name: size, amount });
    }
   }

   updateLocalStorage(state.cart);
  },
  removeItem: (state, action: PayloadAction<{ id: number }>) => {
   const { id } = action.payload;
   const index = findProductIndex(state.cart, id);

   state.cart.splice(index, 1);
   updateLocalStorage(state.cart);
  }
 }
});

export const { addToCart, changeAmount, removeItem } = cartSlice.actions;

export const selectCart = (state: CartState) => state.cartSlice.cart;

export default cartSlice.reducer;
