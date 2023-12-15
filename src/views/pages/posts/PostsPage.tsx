import { useState } from "react";
import { usePost } from "../../../context/postContext";
import { deletePost } from "../../../services/api/posts";
import { sendNotification } from "../../../utils/notifications";
import AllPosts from "./AllPosts";
import SinglePost from "./SinglePost";
import PostComments from "./PostComments";
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { useTheme } from "../../../context/themeContext";

const PostsPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { showPost, showComments, contentTitle } = usePost();
  const { isThemeLight, setIsThemeLight } = useTheme();

  const handleDeltePost = async (id: string) => {
    let res = await deletePost(id);
    console.log("deltePost", res);

    if (res.status === 200) {
      sendNotification("success", "Post deleted succesfully");
    }
  };

  return (
    <section
      className={` flex justify-center py-32 min-h-[100vh] ${
        isThemeLight ? "bg-slate-500 text-black" : "dark__mode"
      }`}
      onClick={() => setShowMenu(false)}
    >
      <div className="custom__container">
        <div className="flex__SB mb-10">
          <h1 className="text-5xl text-center font-medium text-white">
            {contentTitle}
          </h1>
          <div className="flex justify-center gap-x-8">
            <FaMoon
              size={25}
              onClick={() => setIsThemeLight(false)}
              className="cursor-pointer"
            />
            <GoSun
              size={25}
              onClick={() => setIsThemeLight(true)}
              className="cursor-pointer"
            />
          </div>
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
