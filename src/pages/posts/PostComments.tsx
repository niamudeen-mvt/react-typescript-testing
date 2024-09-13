import api from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import PostContainer from "../../components/PostContainer";
import { TComment } from "../../utils/types";
import Loader from "../../components/Loader";



const PostComments = () => {

  const { postId } = useParams()

  const { data: COMMENTS, isLoading } = useQuery({
    queryKey: ['post_comments', postId],
    queryFn: async () => {
      const response = await api.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return response?.data || [];
    }
  })



  return (
    <PostContainer>
      {
        isLoading && <Loader />
      }
      <div >
        {COMMENTS ? (
          <section className="custom__contianer">

            {/* Go back button */}
            <Link to={`/post/${postId}`}>
              <button
                className="mb-4"
              >
                Go Back
              </button>
            </Link>

            {/* Comments */}
            <div className="bg-white p-10 grid gap-y-4 rounded-lg shadow-2xl">
              <div className="grid gap-y-5">
                {COMMENTS.length ? (
                  COMMENTS.map(
                    (
                      comment: TComment,
                      index: number
                    ) => {
                      return (
                        <div className="mb-4 grid gap-y-2">
                          <p className="text-black font-semibold">
                            {index + 1}.{`  `}
                            {comment.name}
                          </p>
                          <p className="text-slate-500 text-xs">{comment.email}</p>
                          <p className="text-black text-xs">{comment.body}</p>
                        </div>
                      );
                    }
                  )
                ) : (
                  <div>No comments to show</div>
                )}
              </div>
            </div>

          </section>
        ) : (
          <p>No Comments to show</p>
        )}
      </div>
    </PostContainer>

  );
};

export default PostComments;
