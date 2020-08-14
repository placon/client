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

export default {
  requestSignup,
  requestCheckEmailDuplication,
  requestLogin,
  requestAuth,
  requestLogout,
};
