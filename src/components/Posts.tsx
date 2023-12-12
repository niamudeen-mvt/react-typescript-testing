import { useEffect, useState } from "react";
import CustomDropdown from "./shared/CustomDropdown";
import { fetchPost } from "../services/api/posts";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = () => {
  const [posts, setPosts] = useState<{ id: string; title: string }[]>([]);

  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetchPost();
      if (res?.status === 200) {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-slate-500 text-black flex justify-center py-32 min-h-[100vh]"
      onClick={() => setShowMenu(false)}
    >
      <div className="custom__container">
        <div className="flex__SB mb-10">
          <h1 className="text-5xl text-center font-medium text-white">POSTS</h1>
          <CustomDropdown showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        <InfiniteScroll
          dataLength={posts.length} // This is important to prevent unnecessary loads
          next={loadPosts} // Load more function
          hasMore={true} // Set this to false when all posts are loaded
          loader={<h4>Loading...</h4>} // Loader to show while loading more posts
          endMessage={<p>No more posts</p>} // Message to show at the end
        >
          <ul className="flex flex-col gap-y-4">
            {posts.map((post: { title: string; id: string }) => (
              <li
                key={post.id}
                className="bg-white rounded-lg px-3 text-slate-500 h-12 outline-none cursor-pointer flex items-center gap-x-4"
              >
                <p>{post.id}</p>
                <p>{post.title}</p>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Posts;
