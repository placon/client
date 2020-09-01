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
};
