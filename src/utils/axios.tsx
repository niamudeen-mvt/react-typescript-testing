import axios from "axios";
import { getAccessToken } from "./helper";

const BASE_URL = "http://localhost:8000/api/v1";

// const BASE_URL = "https://test-backend-iota.vercel.app/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {
    if (config.url !== "/auth/login" && config.url !== "/auth/register") {
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
