import axios from "axios";

// 회원가입
function requestSignup(data) {
  console.log("회원가입 데이터 체크", data);
  return axios.post("/api/users/register", data);
}

// 이메일 중복확인
function requestCheckEmailDuplication(email) {
  return axios.get(`/api/users/register/${email}`);
}

// 로그인
function requestLogin(data) {
  return axios.post("/api/users/login", data);
}

// 인증
function requestAuth() {
  return axios.get("/api/users/auth");
}

// 로그아웃
function requestLogout() {
  return axios.get("/api/users/logout");
}

// 유저 정보 조회
function requestUserInfo({ email }) {
  console.log("api에서", email);
  return axios.get(`/api/users/display/one/${email}`);
}

// 프로필 이미지 업로드
async function uploadUserImage(sendingData) {
  const { data } = await axios.post(
    "/api/users/upload/profileImage",
    sendingData
  );
  console.log("api 받은 결과", data);
  return data;
}

export default {
  requestSignup,
  requestCheckEmailDuplication,
  requestLogin,
  requestAuth,
  requestLogout,
  requestUserInfo,
  uploadUserImage,
};
