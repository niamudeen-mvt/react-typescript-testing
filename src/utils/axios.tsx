import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";
// const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
