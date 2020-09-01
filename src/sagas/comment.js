import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  WRITE_COMMENT_REQUEST,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../reducers/comment";

import commentApi from "../api/comment";

function* deleteComment(action) {
  try {
    const { data } = yield call(commentApi.deleteComment, action.payload);
    console.log("결과 확인 사가에서 ", data);

    if (data && data.delete_comment_success) {
      yield put({
        type: DELETE_COMMENT_SUCCESS,
        payload: data.deleted_comment,
      });
    } else {
      yield put({
        type: DELETE_COMMENT_FAILURE,
        payload: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchDeleteComment() {
  yield takeEvery(DELETE_COMMENT_REQUEST, deleteComment);
}

// 댓글 작성
function* writeComment(action) {
  console.log("사가에서 보낼 데이터 테스트", action.payload);

  try {
    const { data } = yield call(commentApi.writeComment, action.payload);
    console.log(data);

    if (data && data.upload_comment_success) {
      console.log(data);
      yield put({
        type: WRITE_COMMENT_SUCCESS,
        payload: data.uploaded_comment,
      });
    } else {
      yield put({
        type: WRITE_COMMENT_FAILURE,
        payload: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchWriteComment() {
  yield takeEvery(WRITE_COMMENT_REQUEST, writeComment);
}

export default function* commentSaga() {
  yield all([fork(watchWriteComment), fork(watchDeleteComment)]);
}
