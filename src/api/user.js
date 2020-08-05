import axios from "axios";

// 회원가입
function requestSignup(data) {
  return axios.post("/api/users/register", data);
}

// 이메일 중복확인
function requestCheckEmailDuplication(email) {
  return axios.get(`/api/users/register?email=${email}`);
}

// 로그인
function requestLogin(data) {
  return axios.post("/api/users/login", data);
}

export default {
  requestSignup,
  requestCheckEmailDuplication,
  requestLogin,
};
