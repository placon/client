import { all, fork } from "redux-saga/effects";

import user from "../sagas/user";
import post from "../sagas/post";

export function* rootSaga() {
  console.log("hello world");
  yield all([fork(user), fork(post)]);
}

export default rootSaga;
