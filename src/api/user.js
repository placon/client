import { baseUrl } from "../config/config";
import axios from "axios";

function requestSignup(data) {
  return axios.post(`${baseUrl}/user/signup`, data);
}

export default {
  requestSignup,
};
