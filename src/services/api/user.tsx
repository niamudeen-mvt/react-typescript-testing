import api from "../../utils/axios";

export const getUser = async (): Promise<any> => {
  try {
    let response = await api.get(`/auth/user`);
    return response;
  } catch (error) {
    return error;
  }
};
