import { config } from "../config";

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

export const formattedDate = (dateTime: number | Date | undefined) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateFormatter.format(dateTime);
};

// export const formattedTime = (dateTime: number | Date | undefined) => {
//   const filterdDay = daysOfWeek
//     .map((day) => {
//       if (day.value === dateTime.toString().substring(0, 3)) {
//         return day.label;
//       }
//     })
//     .filter((label) => label !== undefined);

//   const timeFormatter = new Intl.DateTimeFormat("en-US", {
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });

//   return timeFormatter.format(dateTime) + "," + filterdDay;
// };
