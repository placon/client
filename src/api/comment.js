import axios from "axios";

function writeComment(sendingData) {
  const result = axios.post(`/api/posts/comment/upload`, sendingData);
  console.log("댓글 작성 결과 확인 : ", result);

  return result;
}

function commentList(sendingData) {
  const { post_id, page_index, page_size } = sendingData;
  const result = axios.get(
    `api/posts/comment/display/${post_id}/${page_index}/${page_size}`
  );
  console.log("댓글 리스트 결과 확인 : ", result);

  return result;
}

function deleteComment(sendingData) {
  const { _id, post_id } = sendingData;
  // const result =
  return null;
}

export default {
  writeComment,
  commentList,
};
