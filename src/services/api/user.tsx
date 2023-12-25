import axios from "axios";
import api from "../../utils/axios";
import { config } from "../../config";

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

// export const postStories = async (body: FormData): Promise<any> => {
//   try {
//     let response = await api.post(`/story/post`, body, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const postStories = async (body: any): Promise<any> => {
  try {
    let response = await api.post(`/story/post`, body);
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

export const deleteStory = async (id: string): Promise<any> => {
  try {
    let response = await api.delete(`/story/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUploadcareImg = async (fileId: string): Promise<any> => {
  try {
    let response = await axios.delete(
      `https://api.uploadcare.com/files/${fileId}/`,
      {
        headers: {
          Authorization: `Uploadcare.Simple ${config.UPLOADCARE_PUBLIC_KEY}:${config.UPLOADCARE_PRIVATE_KEY}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const likeStory = async (body: any): Promise<any> => {
  try {
    let response = await api.patch(`/story/likes`, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const storyViews = async (body: any): Promise<any> => {
  try {
    let response = await api.patch(`/story/views`, body);
    return response;
  } catch (error) {
    return error;
  }
};
