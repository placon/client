import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
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
  try {
    var { data } = yield call(UserApi.requestLogin, action.payload);
    // console.log("로그인 찌겅보기", data);
    if (data.login_success) {
      var { data } = yield call(UserApi.requestAuth);
      console.log("인증 된건가?", data);
    } else {
      console.log(data.err);
      alert(data.err);
      return;
    }
    yield put({
      type: LOG_IN_SUCCESS,
      payload: data,
    });
    // auth 요청 해야함.
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      errorReason: e,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function* logout(action) {
  try {
    var { data } = yield call(UserApi.requestLogout);
    console.log("로그아웃 확인", data);
    window.sessionStorage.removeItem("isLoggedIn");
    window.sessionStorage.removeItem("myInfo");
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    window.location.reload();
  } catch (e) {
    console.log(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: data.err,
    });
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* userInfo(action) {
  try {
    var result = yield call(UserApi.requestUserInfo, action.payload);
    console.log(result);

    if (result) {
      yield put({
        type: USER_INFO_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: USER_INFO_FAILURE,
        payload: result.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchUserInfo() {
  yield takeEvery(USER_INFO_REQUEST, userInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchUserInfo),
  ]);
}
