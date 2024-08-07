export const BASE_URL = "http://localhost:8080/api/v1";

// export const BASE_URL = "https://test-backend-iota.vercel.app/api/v1";

export const config = {
  ACCESS_TOKEN_KEY: process.env.REACT_APP_ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REACT_APP_REFRESH_TOKEN_KEY,
  UPLOADCARE_PUBLIC_KEY: process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY,
  UPLOADCARE_PRIVATE_KEY: process.env.REACT_APP_UPLOADCARE_SECRET_KEY,
};
