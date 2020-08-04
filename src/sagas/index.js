import { all, fork } from "redux-saga/effects";

import user from "../sagas/user";

export function* rootSaga() {
  console.log("hello world");
  yield all([fork(user)]);
}

export default rootSaga;
