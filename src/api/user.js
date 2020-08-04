import { baseUrl } from "../config/config";
import axios from "axios";

function requestSignup(data) {
  console.log("여기 api", data);

  // return axios.post(`${baseUrl}/user/signup`, data);
  return axios.post("/api/users/register", data);
}

export default {
  requestSignup,
};
