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
  password: string;
}): Promise<any> => {
  try {
    let response = await api.post(`/auth/login`, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const refreshTokenApi = async (userId: {
  userId: string;
}): Promise<any> => {
  try {
    const response = await api.get(`/auth/refresh-token/${userId}`);
    return response;
  } catch (error) {
    return error;
  }
};
