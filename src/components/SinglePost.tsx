import { useEffect, useState } from "react";
import api from "../utils/axios";
import CustomDrodown from "./shared/CustomDrodown";
import { usePost } from "../context/postContext";

const SinglePost = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({
    id: 0,
    title: "",
    body: "",
  });

  const { postId, handlePostId, handleShowPost, handleContentTitle } =
    usePost();

  // FETCHING SINGLE POST ================
  const fetchSinglePost = async () => {
    setIsLoading(true);
    let res = await api.get(`/posts/${postId}`);
    if (res?.status === 200) {
      setPost(res?.data);
    }
    setIsLoading(false);
  };

  // USEEFFECT ON FIRST RENDER ===================
  useEffect(() => {
    fetchSinglePost();
  }, []);

  const dropMenu = [
    {
      id: 1,
      title: "See Comments",
    },
  ];
  return (
    <>
      {post ? (
        <section className="custom__contianer">
          <button
            className="mb-4"
            onClick={() => {
              handleShowPost(false);
              handlePostId("");
              handleContentTitle("Posts");
            }}
          >
            Go Back
          </button>
          <div className="bg-white p-10 grid gap-y-4 rounded-lg shadow-2xl">
            {isLoading ? (
              <div>Loading .......</div>
            ) : (
              <>
                <div className="flex justify-end">
                  <CustomDrodown
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    dropMenu={dropMenu}
                  />
                </div>
                <h1 className="text-3xl">Title : {post.title}</h1>
                <p>body : {post.body}</p>
              </>
            )}
          </div>
        </section>
      ) : (
        <p>No Post to show</p>
      )}
    </>
  );
};

export default SinglePost;
