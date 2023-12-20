import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { usePost } from "../../../context/postContext";
import { fetchPost } from "../../../services/api/posts";
import CustomLoader from "../../../components/Loader";

interface IProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeltePost: (id: string) => Promise<void>;
}

const AllPosts = ({ showMenu, setShowMenu, handleDeltePost }: IProps) => {
  const [posts, setPosts] = useState<{ id: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handlePostId, handleShowPost, postId, handleContentTitle } =
    usePost();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetchPost();
      if (res?.status === 200) {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) return <CustomLoader />;
  return (
    <ul className="flex flex-col gap-y-4">
      {posts.map((post: { title: string; id: string }) => (
        <li
          key={post.id}
          className="bg-white rounded-lg px-3 text-slate-500 h-12 outline-none cursor-pointer flex__SB gap-x-4"
          onClick={() => {
            handleShowPost(true);
            handleContentTitle("Post");
            handlePostId(post.id);
          }}
        >
          <p className="text-xs sm:text-sm">
            {post.id}.{`  `}
            {post.title}
          </p>

          <div className="group relative cursor-pointer">
            <span
              onClick={(event) => {
                event.stopPropagation();
                setShowMenu(!showMenu);
                handlePostId(post.id);
              }}
            >
              <BsThreeDotsVertical className="font-medium text-black" />
            </span>
            {showMenu && postId === post.id ? (
              <div className="bg-white rounded-lg text-sm absolute top-8 -translate-x-[80%] p-3 transition-all duration-500 active:block shadow-2xl z-10 min-w-[150px]">
                <ul className="h-full flex flex-col justify-between w-full">
                  <li
                    onClick={() => {
                      handleShowPost(true);
                      handleContentTitle("Post");
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
  );
};

export default AllPosts;
