import { useState } from "react";
import api from "../../utils/axios";
import CustomDrodown from "../../components/shared/CustomDrodown";
import { useTheme } from "../../context/themeContext";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import PostContainer from "../../components/PostContainer";
import Loader from "../../components/Loader";

const Post = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { isThemeLight } = useTheme();

  const { postId } = useParams()


  const { data: POST, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      try {
        let res = await api.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        return res?.data || {};

      } catch (error) {
        console.log('error: ', error);
        return error
      }
    }
  })


  const dropMenu = [
    {
      id: 1,
      title: "See Comments",
    },
  ];
  return (
    <PostContainer>
      <div className="custom__container">
        {
          isLoading && <Loader />
        }
        {POST &&
          <section className='space-y-4'>

            {/* go back button  */}
            <Link to={`/posts`}>
              <button type="button">
                Go Back
              </button>
            </Link>

            {/* post content */}
            <div
              className={`${isThemeLight ? "bg-white" : "bg-white text-black"
                } p-10 grid gap-y-4 rounded-lg shadow-2xl`}
            >
              <div className="flex justify-end">
                <CustomDrodown
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  dropMenu={dropMenu}
                />
              </div>
              <h1 className="text-3xl">Title : {POST.title}</h1>
              <p>body : {POST.body}</p>
            </div>

          </section>
        }
      </div>
    </PostContainer>
  );
};

export default Post;
