import { useEffect, useState } from "react";
import { deletePost, fetchPost } from "../services/api/posts";
import { BsThreeDotsVertical } from "react-icons/bs";
import SinglePost from "./SinglePost";
import PostComments from "./PostComments";
import { sendNotification } from "../utils/notifications";

const Posts = () => {
  const [posts, setPosts] = useState<{ id: string; title: string }[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postId, setPostId] = useState("");
  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [contentTitle, setContentTitle] = useState("Posts");

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetchPost();
      if (res?.status === 200) {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(showPost, "showPost");
  // console.log(showComments, "showComments");

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
        {isLoading ? (
          <div>Loading..........</div>
        ) : showPost && !showComments ? (
          <SinglePost
            setShowPost={setShowPost}
            setPostId={setPostId}
            postId={postId}
            setShowComments={setShowComments}
            setContentTitle={setContentTitle}
          />
        ) : showPost && showComments ? (
          <PostComments
            setPostId={setPostId}
            postId={postId}
            setShowPost={setShowPost}
            setShowComments={setShowComments}
            setContentTitle={setContentTitle}
          />
        ) : (
          // POSTS
          <ul className="flex flex-col gap-y-4">
            {posts.map((post: { title: string; id: string }) => (
              <li
                key={post.id}
                className="bg-white rounded-lg px-3 text-slate-500 h-12 outline-none cursor-pointer flex__SB gap-x-4"
              >
                <p>
                  {post.id}.{`  `}
                  {post.title}
                </p>

                <div className="group relative cursor-pointer">
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowMenu(!showMenu);
                      setPostId(post.id);
                    }}
                  >
                    <BsThreeDotsVertical className="font-medium text-black" />
                  </span>
                  {showMenu && postId === post.id ? (
                    <div className="bg-white rounded-lg text-sm absolute top-8 -translate-x-[80%] p-3 transition-all duration-500 active:block shadow-2xl z-10 min-w-[150px]">
                      <ul className="h-full flex flex-col justify-between w-full">
                        <li
                          onClick={() => {
                            setShowPost(true);
                            setContentTitle("Post");
                          }}
                          className="flex gap-x-2 hover:bg-blue-300 px-3 py-1 rounded-md transition-all duration-300 text-black"
                        >
                          <span className="text-xs">View Post</span>
                        </li>
                        <li
                          onClick={() => handleDeltePost(post.id)}
                          className="flex gap-x-2 hover:bg-blue-300 px-3 py-1 rounded-md transition-all duration-300 text-black"
                        >
                          <span className="text-xs">Delete Post</span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Posts;
