import { useQuery } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import { fetchPost } from "../../services/api/posts";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import PostContainer from "../../components/PostContainer";
import { useState } from "react";
import { TPost } from "../../utils/types";


const PostsPage = () => {

  const { data: POSTS, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await fetchPost();
    },
    retry: 1
  })


  return (
    <PostContainer>
      {isLoading && <Loader />}
      <div className="flex flex-col gap-y-4">
        {POSTS && POSTS.length > 0 && POSTS.map((post: TPost) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PostContainer >
  );

};






const PostCard = ({ post }: { post: TPost }) => {

  return <div
    key={post.id}
    className="bg-white rounded-lg px-3 text-slate-500 h-12 outline-none cursor-pointer flex__SB gap-x-4"
  >
    <PostTitle post={post} />
    <PostActionsMenu post={post} />
  </div>
}



const PostTitle = ({ post }: { post: TPost }) => {
  return <>
    <Link
      to={`/post/${post.id}`}
    >
      <p className="text-xs sm:text-sm">
        {post.id}.{`  `}
        {post.title}
      </p>
    </Link>
  </>
}

const PostActionsMenu = ({ post }: { post: TPost }) => {


  const [showMenu, setShowMenu] = useState(false)
  const [postId, setPostId] = useState<string | null>(null)


  const handleShowPostMenu = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, postId: string) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
    setPostId(postId)
  }


  const isShow = showMenu && postId === post?.id
  const deletePost = async (postId: string) => {

  }

  const postMenuActions = [
    {
      id: 1,
      title: "View Post",
      path: `/post/${post.id}`
    },
    {
      id: 2,
      title: "Delete Post",
      path: "#",
      handle: deletePost
    }
  ]



  return <div className="group relative cursor-pointer">

    {/* post menu button */}
    <span
      onClick={(event) => handleShowPostMenu(event, post.id)}>
      <BsThreeDotsVertical className="font-medium text-black" />
    </span>

    {/* post menu actions dropdown */}

    {
      isShow &&
      <div className="bg-white rounded-lg text-sm absolute top-8 -translate-x-[80%] p-3 transition-all duration-500 active:block shadow-2xl z-10 min-w-[150px]">
        <ul className="h-full flex flex-col justify-between w-full">

          {postMenuActions && postMenuActions.map((menu) => (
            <Link
              to={menu.path}
            >
              <li
                className="flex gap-x-2 hover:bg-blue-300 px-3 py-1 rounded-md transition-all duration-300 text-black"
                onClick={() => menu?.handle && menu.handle(postId)}
              >
                <span className="text-xs">{menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    }


  </div>
}


export default PostsPage;
