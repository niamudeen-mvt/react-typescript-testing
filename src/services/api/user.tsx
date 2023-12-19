import api from "../../utils/axios";

export const getUser = async (): Promise<any> => {
  try {
    let response = await api.get(`/auth/user`);
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadFiles = async (body: FormData): Promise<any> => {
  try {
    let response = await api.post(`/files/upload`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getFiles = async (): Promise<any> => {
  try {
    let response = await api.get(`/files`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteImage = async (id: string): Promise<any> => {
  try {
    let response = await api.delete(`/files/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const postStories = async (body: FormData): Promise<any> => {
  try {
    let response = await api.post(`/story/post`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getStories = async (): Promise<any> => {
  try {
    let response = await api.get(`/story`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteStory = async (): Promise<any> => {
  try {
    let response = await api.delete(`/story/delete`);
    return response;
  } catch (error) {
    return error;
  }
};
