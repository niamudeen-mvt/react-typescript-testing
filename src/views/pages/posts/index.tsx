import { useState } from "react";
import { usePost } from "../../../context/postContext";
import { deletePost } from "../../../services/api/posts";
import { sendNotification } from "../../../utils/notifications";
import AllPosts from "./AllPosts";
import SinglePost from "./SinglePost";
import PostComments from "./PostComments";

const PostsPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { showPost, showComments, contentTitle } = usePost();

  const handleDeltePost = async (id: string) => {
    let res = await deletePost(id);
    console.log("deltePost", res);

    if (res.status === 200) {
      sendNotification("success", "Post deleted succesfully");
    }
  };

  return (
    <section
      className="bg-slate-500 text-black flex justify-center py-32 min-h-[100vh]"
      onClick={() => setShowMenu(false)}
    >
      <div className="custom__container">
        <div className="flex__SB mb-10">
          <h1 className="text-5xl text-center font-medium text-white">
            {contentTitle}
          </h1>
        </div>
        {showPost && !showComments ? (
          <SinglePost />
        ) : showPost && showComments ? (
          <PostComments />
        ) : (
          <AllPosts
            handleDeltePost={handleDeltePost}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          />
        )}
      </div>
    </section>
  );
};

export default PostsPage;
