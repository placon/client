import axios from "axios";

// 포스트 리스트
function postList(data) {
  console.log(data);
  return null;
  // return axios.get("/api/posts/list")
  // 페이징이랑 정보 같이 보내야 될듯.
}

// 포스트 작성
function writePost(data) {
  console.log(data);
  return null;
  // return axios.post("/api/posts/write");
}

// 포스트 삭제
function deletePost(data) {
  console.log(data);
  return null;
  // return axios.delete("/api/posts/delete");
}

// 포스트 수정
function updatePost(data) {
  console.log(data);
  return null;
  // return axios.put("/api/posts/update");
}

// 포스트 상세보기
function seePostDetail(data) {
  console.log(data);
  return null;
  // return axios.get("/api/posts/detail");
}

export default {
  writePost,
  deletePost,
  updatePost,
  seePostDetail,
};
