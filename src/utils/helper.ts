// access token

import { config } from "../config/index";

export const storeAccessTokenLS = (accessToken: string) => {
  if (config.ACCESS_TOKEN_KEY)
    return localStorage.setItem(config.ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const removeAccessToken = () => {
  return localStorage.removeItem("access_token");
};

// Refresh token

export const storeRefreshTokenLS = (refreshToken: string) => {
  if (config.REFRESH_TOKEN_KEY)
    return localStorage.setItem(config.REFRESH_TOKEN_KEY, refreshToken);
};
export const getRefreshToken = () => {
  if (config.REFRESH_TOKEN_KEY)
    return localStorage.getItem(config.REFRESH_TOKEN_KEY);
};
