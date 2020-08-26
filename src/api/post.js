import axios from "axios";

// 학습 언어 포스트 리스트 조회
const postList = async (sendingData) => {
  // console.log("api 파일에서 체크 ", sendingData);
  const page_size = sendingData.page_size;
  const page_index = sendingData.page_index;
  const native_language = sendingData.native_language;
  const target_language = sendingData.target_language;
  const { data } = await axios.get(
    `/api/posts/display/list/lang/${native_language}/${target_language}/${page_index}/${page_size}`
  );

  return data;
};

// 특정 사용자의 포스트 리스트 조회
async function userPostList(sendingData) {
  const user_id = sendingData.user_id;
  const page_size = sendingData.page_size;
  const page_index = sendingData.page_index;
  const { data } = await axios.get(
    `/api/posts/display/list/user/${user_id}/${page_index}/${page_size}`
  );

  return data;
}

// 언어별 포스트 리스트

// 포스트 작성
function writePost(data) {
  console.log("api data", data);
  return axios.post("/api/posts/upload", data);
}

// 포스트 삭제
function deletePost({ postId }) {
  console.log("api 파일에서 찍어보기", postId);
  // return null;
  return axios.get(`/api/posts/delete/${postId}`);
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
  postList,
  userPostList,
  writePost,
  deletePost,
  updatePost,
  seePostDetail,
};
