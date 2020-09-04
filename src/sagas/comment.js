import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  WRITE_COMMENT_REQUEST,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  WRITE_CORRECTION_REQUEST,
  WRITE_CORRECTION_SUCCESS,
  WRITE_CORRECTION_FAILURE,
  DELETE_CORRECTION_REQUEST,
  DELETE_CORRECTION_SUCCESS,
  DELETE_CORRECTION_FAILURE,
  LOAD_CORRECTION_REQUEST,
  LOAD_CORRECTION_SUCCESS,
  LOAD_CORRECTION_FAILURE,
} from "../reducers/comment";

import commentApi from "../api/comment";

function* deleteComment(action) {
  try {
    const { data } = yield call(commentApi.deleteComment, action.payload);
    // console.log("결과 확인 사가에서 ", data);

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
  // console.log("사가에서 보낼 데이터 테스트", action.payload);

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

// 첨삭 댓글 작성
function* writeCorrection(action) {
  try {
    const { data } = yield call(commentApi.writeCorrection, action.payload);

    if (data && data.upload_correction_success) {
      console.log(data);
      yield put({
        type: WRITE_CORRECTION_SUCCESS,
        payload: data.uploaded_correction,
      });
      alert("첨삭 댓글이 등록되었습니다!!");
    } else {
      yield put({
        type: WRITE_CORRECTION_FAILURE,
        payload: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

// 첨삭 댓글 리스트
function* loadCorrectionList(action) {
  try {
    const { data } = yield call(commentApi.correctionList, action.payload);
    if (data && data.display_correction_list_success) {
      console.log("sdfsf", data);
      yield put({
        type: LOAD_CORRECTION_SUCCESS,
        payload: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchCorrectionList() {
  yield takeEvery(LOAD_CORRECTION_REQUEST, loadCorrectionList);
}

function* watchWriteCorrection() {
  yield takeEvery(WRITE_CORRECTION_REQUEST, writeCorrection);
}

export default function* commentSaga() {
  yield all([
    fork(watchWriteComment),
    fork(watchDeleteComment),
    fork(watchWriteCorrection),
    fork(watchCorrectionList),
  ]);
}
