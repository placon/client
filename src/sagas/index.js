import axios from "axios";
import { all, fork } from "redux-saga/effects";
import { baseUrl } from "../config/config";
import user from "../sagas/user";

export default function* rootSaga() {
  yield all([fork(user)]);
}
