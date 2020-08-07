import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
} from "../reducers/user";

import UserApi from "../api/user";

// 회원가입 기능
function* signUp(action) {
  console.log("payload 찍어보기", action.payload);
  try {
    const result = yield call(UserApi.requestSignup, action.payload);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      errorReason: result.data.error,
    });
  }
}

function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// 로그인
function* login(action) {
  console.log(action.data);
  try {
    var { data } = yield call(UserApi.requestLogin, action.payload);
    // console.log("로그인 찌겅보기", data);
    if (data.login_success) {
      var { data } = yield call(UserApi.requestAuth);
      console.log("인증 된건가?", data);
    }
    yield put({
      type: LOG_IN_SUCCESS,
      payload: data,
    });
    // auth 요청 해야함.
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      errorReason: result.data.error,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchSignup), fork(watchLogin)]);
}
