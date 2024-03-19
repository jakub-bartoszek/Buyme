import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getCollections } from "./getCollections";
import { fetchCollections, setCollections, setCollectionsStatus } from "../redux/collectionsSlice";
import { Product } from "../../App";

function* collectionsSagaHandler() {
 yield put(setCollectionsStatus("loading"));
 yield delay(1000);
 try {
  const collections: Product = yield call(getCollections);
  yield put(setCollections(collections));
  yield put(setCollectionsStatus("success"));
 } catch (e) {
  console.log(e);
  yield put(setCollectionsStatus("error"));
 }
}

export function* collectionsSaga() {
 yield takeLatest(fetchCollections.type, collectionsSagaHandler);
}
