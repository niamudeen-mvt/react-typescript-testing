import api from "../../utils/axios";

export const registerUser = async (body: {
  name: string;
  phone: number;
  email: string;
  password: string;
}): Promise<any> => {
  try {
    let response = await api.post(`/auth/register`, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body: {
  email: string;
  pasword: string;
}): Promise<any> => {
  try {
    let response = await api.post(`/auth/login`, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const refreshTokenApi = async (body: {
  refresh_token: string;
}): Promise<any> => {
  try {
    const response = await api.post("/auth/refresh-token", body);
    return response;
  } catch (error) {
    return error;
  }
};
