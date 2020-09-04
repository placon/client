import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  WRITE_POST_REQUEST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAILURE,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
} from "../reducers/post";

import postApi from "../api/post";

// 학습 언어 포스트 리스트
function* watchPostList() {
  yield takeEvery(POST_LIST_REQUEST, postList);
}

function* postList(action) {
  // console.log("사가에서 payload 테스트", action.payload);
  try {
    const { data } = yield call(postApi.postList, action.payload);

    console.log("결과확인", data);
    if (data && data.display_postList_lang_success) {
      yield put({
        type: POST_LIST_SUCCESS,
        payload: data,
      });
    } else {
      yield put({
        type: POST_LIST_FAILURE,
        payload: data.note,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

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
        payload: result.data.uploaded_post,
      });
      alert("포스트가 성공적으로 등록되었습니다.");
      window.location.reload();
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
    console.log("삭제 결과는?", result);
    // 성공이면
    if (result) {
      console.log("성공");
      yield put({
        type: DELETE_POST_SUCCESS,
        payload: result.data,
      });
      alert("포스트가 성공적으로 삭제되었습니다.");
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: DELETE_POST_FAILURE,
      payload: result,
    });
  }
}

// 포스트 좋아요 & 좋아요 취소
function* likePost(action) {
  try {
    const result = yield call(postApi.likePost, action.payload);
    console.log(result);
    const { data } = result;
    if (data && data.update_like_success) {
      console.log("saga에서 결과확인", data);
      yield put({
        type: POST_LIKE_SUCCESS,
        payload: data,
      });
      alert("좋아요 반영 완료");
    } else {
      yield put({
        type: POST_LIKE_FAILURE,
        payload: data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchLikePost() {
  yield takeEvery(POST_LIKE_REQUEST, likePost);
}

export default function* postSaga() {
  yield all([
    fork(watchWritePost),
    fork(watchDeletePost),
    fork(watchPostList),
    fork(watchLikePost),
  ]);
}
