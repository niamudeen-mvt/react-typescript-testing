import { useEffect, useState } from "react";
import CustomDropdown from "./shared/CustomDropdown";
import { fetchPost } from "../services/api/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    (async () => {
      let res = await fetchPost();
      if (res?.status === 200) {
        setPosts(res?.data);
      }
    })();
  }, []);

  return (
    <section
      className="bg-slate-500 text-black flex justify-center py-32 min-h-[100vh]"
      onClick={() => setShowMenu(false)}
    >
      <div className="w-1/2">
        <div className="flex__SB mb-10">
          <h1 className="text-5xl text-center font-medium  text-white">
            POSTS
          </h1>
          <CustomDropdown showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        <ul className="flex flex-col gap-y-4">
          {posts?.length ? (
            posts.map((post: { title: string; id: string }) => {
              return (
                <li
                  key={post.id}
                  className="bg-white rounded-lg px-3 text-slate-500 h-12 outline-none cursor-pointer flex items-center gap-x-4"
                >
                  <p>{post.id}</p>
                  <p>{post.title}</p>
                </li>
              );
            })
          ) : (
            <div className="text-white">Loading..........</div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Posts;
