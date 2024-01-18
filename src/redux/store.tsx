import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice";

export const store = configureStore({
 reducer: {
  productsSlice: productsReducer,
  cartSlice: cartReducer,
  favouritesSlice: favouritesReducer
 }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
