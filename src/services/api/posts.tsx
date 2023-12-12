import api from "../../utils/axios";

export const fetchPost = async (): Promise<any> => {
  try {
    let response = await api.get("/posts");
    return response;
  } catch (error) {
    return error;
  }
};
