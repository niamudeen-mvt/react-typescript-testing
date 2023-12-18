import api from "../../utils/axios";

export const fetchPost = async (): Promise<any> => {
  try {
    let response = await api.get(`https://jsonplaceholder.typicode.com/posts`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePost = async (id: string): Promise<any> => {
  try {
    let response = await api.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
