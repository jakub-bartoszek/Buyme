import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import collectionsReducer from "./collectionsSlice";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
 reducer: {
  productsSlice: productsReducer,
  collectionsSlice: collectionsReducer,
  cartSlice: cartReducer,
  favouritesSlice: favouritesReducer
 },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

sagaMiddleware.run(rootSaga);

export default store;
