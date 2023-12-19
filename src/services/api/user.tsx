import api from "../../utils/axios";

export const getUser = async (): Promise<any> => {
  try {
    let response = await api.get(`/auth/user`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getFiles = async (): Promise<any> => {
  try {
    let response = await api.get(`/auth/files`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteImage = async (id: string): Promise<any> => {
  try {
    let response = await api.delete(`/auth/files/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
