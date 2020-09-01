import { all, fork } from "redux-saga/effects";

import user from "./user";
import post from "./post";
import comment from "./comment";

export function* rootSaga() {
  console.log("hello world");
  yield all([fork(user), fork(post), fork(comment)]);
}

export default rootSaga;
