import axios from "axios";

function writeComment(sendingData) {
  const result = axios.post(`/api/posts/comment/upload`, sendingData);

  return result;
}

async function commentList(sendingData) {
  const { post_id, page_index, page_size } = sendingData;
  const result = await axios.get(
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
