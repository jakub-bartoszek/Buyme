import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getProducts } from "./getProducts";
import { fetchProducts, setProducts, setProductsStatus } from "../redux/productsSlice";
import { Product } from "../../App";

function* productsSagaHandler() {
 yield delay(1000);
 try {
  const products: Product = yield call(getProducts);
  yield put(setProducts(products));
  yield put(setProductsStatus("success"));
 } catch (e) {
  console.log(e);
  yield put(setProductsStatus("error"));
 }
}

export function* productsSaga() {
 yield takeLatest(fetchProducts.type, productsSagaHandler);
}
