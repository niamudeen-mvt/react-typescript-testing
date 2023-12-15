import PostProvider from "../../../context/postContext";
import PostsPage from "./PostsPage";

const PostsContainer = () => {
  return (
    <PostProvider>
      <PostsPage />
    </PostProvider>
  );
};

export default PostsContainer;
