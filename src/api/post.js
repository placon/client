import axios from "axios";

// 포스트 작성
function writePost(data) {
  console.log(data);
  return null;
  // return axios.post("/api/post/write");
}

// 포스트 삭제
function deletePost(data) {
  console.log(data);
  return null;
  // return axios.delete("/api/post/delete");
}

// 포스트 수정
function updatePost(data) {
  console.log(data);
  return null;
  // return axios.put("/api/post/update");
}

// 포스트 상세보기
function seePostDetail(data) {
  console.log(data);
  return null;
  // return axios.get("/api/post/detail");
}

export default {
  writePost,
  deletePost,
  updatePost,
  seePostDetail,
};
