import { all } from "redux-saga/effects";

import { productsSaga } from "./productsSaga";
import { collectionsSaga } from "./collectionsSaga";

export default function* rootSaga() {
 yield all([productsSaga(), collectionsSaga()]);
}
