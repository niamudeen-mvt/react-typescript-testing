import PostProvider from "../../context/postContext";
import PostsPage from "./PostsPage";

const PostsSection = () => {
  return (
    <PostProvider>
      <PostsPage />
    </PostProvider>
  );
};

export default PostsSection;
