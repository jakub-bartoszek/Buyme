import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getCollections } from "./getCollections";
import { fetchCollections, setCollections } from "../redux/collectionsSlice";
import { Product } from "../../App";

function* collectionsSagaHandler() {
 yield delay(1000);
 try {
  const collections: Product = yield call(getCollections);
  yield put(setCollections(collections));
 } catch (e) {
  console.log(e);
 }
}

export function* collectionsSaga() {
 yield takeLatest(fetchCollections.type, collectionsSagaHandler);
}
