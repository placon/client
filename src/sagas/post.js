import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  WRITE_POST_REQUEST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "../reducers/post";

import postApi from "../api/post";

// 포스트 작성
function* watchWritePost() {
  yield takeEvery(WRITE_POST_REQUEST, writePost);
}

function* writePost(action) {
  console.log("포스트 작성 데이터 테스트", action.payload);
  try {
    const result = yield call(postApi.writePost, action.payload);
    console.log(result);
    // 성공이면
    if (result) {
      yield put({
        type: WRITE_POST_SUCCESS,
        payload: result.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: WRITE_POST_FAILURE,
      payload: result.data,
    });
  }
}

// 포스트 삭제
function* watchDeletePost() {
  yield takeEvery(DELETE_POST_REQUEST, deletePost);
}

function* deletePost(action) {
  try {
    const result = yield call(postApi.deletePost, action.payload);
    console.log(result);
    // 성공이면
    if (result) {
      yield put({
        type: DELETE_POST_SUCCESS,
        payload: result.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: DELETE_POST_FAILURE,
      payload: result.data,
    });
  }
}

export default function* postSaga() {
  yield all([fork(watchWritePost), fork(watchDeletePost)]);
}
