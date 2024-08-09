import axios from "axios";
import { refreshTokenApi } from "../services/api/auth";
import { _localStorageConfig, BASE_URL } from "../config";
import { getItemsFromLC, setItemsIntoLS } from "./helper";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// request interceptors

api.interceptors.request.use(
  async function (config) {

    const token = getItemsFromLC("access_token");

    if (config?.url && !["/auth/login", "/auth/register"].includes(config?.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// response interceptors


let isRefreshing = false;
let failedQueue: any = [];
let retryOriginalRequest = null;

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};


api.interceptors.response.use(
  response => response,

  async (error) => {

    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      if (isRefreshing) {

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axios(originalRequest);
        }).catch(err => Promise.reject(err));

      }

      isRefreshing = true;
      retryOriginalRequest = originalRequest;

      try {
        const userId = getItemsFromLC(_localStorageConfig.id);
        if (userId) {
          const res = await refreshTokenApi(userId);

          if (res?.status === 200) {
            const { access_token } = res?.data;

            if (access_token) {

              setItemsIntoLS(_localStorageConfig.token, access_token);

              axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

              processQueue(null, access_token);

              retryOriginalRequest.headers["Authorization"] = `Bearer ${access_token}`;

              return axios(retryOriginalRequest);
            }
          }
        }
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
