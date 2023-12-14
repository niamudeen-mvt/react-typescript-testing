import api from "../../utils/axios";

export const fetchPost = async (): Promise<any> => {
  try {
    let response = await api.get("/posts");
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePost = async (id: string): Promise<any> => {
  try {
    let response = await api.delete(`/posts/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
