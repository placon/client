import axios from "axios";

// 첨삭 댓글 작성
function writeCorrection(sendingData) {
  const result = axios.post(`/api/posts/correction/upload`, sendingData);

  return result;
}

// 첨삭 댓글 삭제
function deleteCorrection(sendingData) {
  const { _id, post_id } = sendingData;
  const result = axios.get(`/api/posts/correction/delete/${_id}/${post_id}`);
  return result;
}

// 첨삭 댓글 리스트
async function correctionList(sendingData) {
  const { post_id, page_index, page_size } = sendingData;
  const result = await axios.get(
    `api/posts/correction/display/${post_id}/${page_index}/${page_size}`
  );

  return result;
}

function writeComment(sendingData) {
  const result = axios.post(`/api/posts/comment/upload`, sendingData);

  return result;
}

async function commentList(sendingData) {
  const { post_id, page_index, page_size } = sendingData;
  const result = await axios.get(
    `api/posts/comment/display/${post_id}/${page_index}/${page_size}`
  );

  return result;
}

function deleteComment(sendingData) {
  const { _id, post_id } = sendingData;
  const result = axios.get(`/api/posts/comment/delete/${_id}/${post_id}`);
  return result;
}

export default {
  writeComment,
  commentList,
  deleteComment,
  writeCorrection,
  deleteCorrection,
  correctionList,
};
