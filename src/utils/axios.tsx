import axios from "axios";
import { getAccessToken, storeAccessTokenLS } from "./helper";
import { refreshTokenApi } from "../services/api/auth";

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token) {
          const res = await refreshTokenApi({
            refresh_token: refresh_token,
          });

          if (res?.status === 200) {
            storeAccessTokenLS(res.data.access_token);

            originalRequest.headers["Authorization"] =
              `Bearer` + res.data.access_token;

            return axios(originalRequest);
          }
        }
      } catch (error) {
        console.log("Refresh token failed");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
