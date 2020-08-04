import axios from "axios";

function requestSignup(data) {
  return axios.post("/api/users/register", data);
}

function requestCheckEmailDuplication(email) {
  return axios.get(`/api/users/register?email=${email}`);
}

export default {
  requestSignup,
  requestCheckEmailDuplication,
};
