import { all, call, fork, put, takeEvery } from "redux-saga";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user";

import UserApi from "../api/user";

// 회원가입 기능
function* signUp(action) {
  console.log(action.payload);
  yield call(UserApi.requestSignup, action.payload);
}

function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignup)]);
}
