import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user";

import UserApi from "../api/user";

// 회원가입 기능
function* signUp(action) {
  console.log("payload 찍어보기", action.payload);
  try {
    yield call(UserApi.requestSignup, action.payload);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    console.log(e);
  }
}

function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignup)]);
}
