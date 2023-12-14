import React, { createContext, useState, FC, useContext } from "react";

type PostContextState = {
  postId: string;
  showPost: boolean;
  showComments: boolean;
  contentTitle: string;
  handlePostId: (id: string) => void;
  handleShowPost: (value: boolean) => void;
  handleShowComments: (value: boolean) => void;
  handleContentTitle: (value: string) => void;
};

const contextDefaultValues: PostContextState = {
  postId: "",
  showPost: false,
  showComments: false,
  contentTitle: "Posts",
  handlePostId: () => {},
  handleShowPost: () => {},
  handleShowComments: () => {},
  handleContentTitle: () => {},
};

const PostContext = createContext<PostContextState>(contextDefaultValues);

export const usePost = () => {
  return useContext(PostContext);
};

const PostProvider = ({ children }: any) => {
  const [postId, setPostId] = useState("");
  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [contentTitle, setContentTitle] = useState("Posts");

  const handlePostId = (id: string) => {
    setPostId(id);
  };
  const handleShowPost = (value: boolean) => {
    setShowPost(value);
  };
  const handleShowComments = (value: boolean) => {
    setShowComments(value);
  };
  const handleContentTitle = (value: string) => {
    setContentTitle(value);
  };

  return (
    <PostContext.Provider
      value={{
        postId,
        showPost,
        showComments,
        contentTitle,
        handlePostId,
        handleShowPost,
        handleShowComments,
        handleContentTitle,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
