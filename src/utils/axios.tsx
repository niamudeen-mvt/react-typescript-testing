import axios from "axios";
import { getAccessToken, getRefreshToken, storeAccessTokenLS } from "./helper";
import { refreshTokenApi } from "../services/api/auth";
import { BASE_URL } from "../config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptors

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

// response interceptors

let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        const refresh_token = getRefreshToken();
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
        console.log("Refresh token failed", error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
