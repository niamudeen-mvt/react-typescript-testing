import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendNotification } from "../../utils/notifications";
import { useAuth } from "../../context/authContext";
import { RootState } from "../../store";
import {
  deleteStory,
  deleteUploadcareImg,
  likeStory,
} from "../../services/api/user";
import ToastComponent from "../shared/Toast";
import Loader from "../Loader";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { hideStory } from "../../store/features/storySlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SLIDER_SETTINGS = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

const Story = ({
  stories,
  seconds,
  setSeconds,
}: {
  stories: any[];
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { authUser } = useAuth();

  const queryClient = useQueryClient();
  const activeStory = useSelector((state: RootState) => state.story);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false)


  const storyActionsMenuRef = useRef<any>(null)

  const activeStoryData = stories?.find(
    (story) => story?.userId === activeStory.userId
  ) || { stories: [] };


  /*
   * This useEffect is used to close the story when the user clicks outside
   * */

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (storyActionsMenuRef.current && !storyActionsMenuRef.current.contains(event.target) && !show) {
  //       setShow(false)
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };

  // }, [])


  /*
   * This useEffect is used to close the story when the timer expires
   * */

  useEffect(() => {
    if (seconds === 0) {
      dispatch(hideStory());
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, dispatch, setSeconds]);


  const deleteStoryHandler = async (storyId: string, fileUrl: string) => {
    const fileId = fileUrl?.split("/")[0];
    await deleteUploadcareImg(fileId);

    const response: any = await deleteStory(storyId);
    return response;
  };

  const likeStoryHandler = async (storyId: string, storyUserId: string) => {
    const response = await likeStory({ storyId, storyUserId });
    return response;
  };

  const { mutate: mutateLike, isPending: isLikePending } = useMutation({
    mutationFn: (payload: any) =>
      likeStoryHandler(payload?.storyId, payload?.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: (error: any) => {
      sendNotification("error", error?.response?.data?.message);
    },
  });

  const { mutate: mutateDelete, isPending: isStoryDeleting } = useMutation({
    mutationFn: (payload: any) =>
      deleteStoryHandler(payload?.storyId, payload?.fileUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      dispatch(hideStory());
      sendNotification("success", "Story deleted successfully");
    },
    onError: (error: any) => {
      dispatch(hideStory());
    },
  });

  const clickToCloseStory = () => {
    setShow(false)
    dispatch(hideStory());
  };


  /**
   * These functions are responsible for the logic to render the jsx for the ui.
   * */

  function renderCloseButton() {
    const SECONDS = seconds < 10 ? "0" + seconds : seconds;
    return (
      <div className="flex gap-x-2">
        <p className="text-white">{SECONDS}</p>
        <IoClose
          size={22}
          className="cursor-pointer text-white"
          onClick={clickToCloseStory}
        />
      </div>
    );
  }


  function renderStoryLikes(storyLikes: any, story: any) {
    if (!story) return;

    const IS_ALREADY_LIKED =
      storyLikes?.length > 0 &&
      storyLikes.map((e: any) => e.userId).includes(authUser._id);
    return (
      <>
        {storyLikes && storyLikes.length > 0 ? (
          <button
            disabled={IS_ALREADY_LIKED}
            onClick={() => mutateLike({ storyId: story._id, userId: story.userId })}
            className="flex gap-x-2"
          >
            <FaHeart size={22} fill="red" />
            <span>{story.likes.length}</span>
          </button>
        ) : (
          <button
            disabled={isLikePending}
            onClick={() => mutateLike({ storyId: story._id, userId: story.userId })}
            className="hover:scale-125 transition-all duration-300 cursor-pointer"
          >
            <GoHeart size={22} />
          </button>
        )}
      </>
    );
  }


  function renderDeleteStory(story: any) {
    return (
      <>
        {story.userId === authUser._id &&
          <div>
            <button id="dropdownMenuIconButton" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 relative" type="button" onClick={() => setShow(!show)}>
              <svg className="w-5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>

            {
              show &&
              <div
                ref={storyActionsMenuRef}
                className="bg-white divide-y divide-gray-100 rounded-lg shadow w-32 absolute top-14 right-8">
                <ul className="py-5 px-3 text-xs text-gray-700 space-y-3" aria-labelledby="dropdownMenuIconButton">
                  <li className="hover:bg-gray-100 py-2 px-2 rounded-md cursor-pointer transition-all duration-300">
                    <button type="button" onClick={() =>
                      mutateDelete({ storyId: story?._id, fileUrl: story.image })
                    }>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            }
          </div>
        }
      </>
    );
  }

  return (
    <>
      {(isLikePending || isStoryDeleting) && <Loader />}
      <ToastComponent />
      {activeStory.show && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-40 flex__center p-10 max-h-screen overflow-y-auto">
          <div className="text-white fixed top-32 right-10 cursor-pointer flex gap-x-4 ">
            {renderCloseButton()}
          </div>

          <div className="bg-white w-full max-w-[450px] min-h-[600px] relative">
            <Slider {...SLIDER_SETTINGS}>
              {activeStoryData.stories &&
                activeStoryData.stories.length > 0 &&
                activeStoryData.stories.map((story: any) => {
                  return (
                    <div
                      className="flex flex-col gap-y-5 space-y-5 p-5 bg-white text-black relative"
                      key={story?._id}
                    >
                      {/* STORY TOP SECTION */}
                      <div className="flex justify-between">
                        <div>
                          <h1 className="text-sm font-semibold">
                            {story?.username}
                          </h1>
                          <span className="text-xs">
                            {new Date(story?.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {renderDeleteStory(story)}
                      </div>

                      {/* STORY MIDDLE SECTION */}
                      {
                        story?.image &&
                        <div className="h-[400px] mb-4 ">
                          <img
                            src={story?.image}
                            alt="story"
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      }

                      {/* STORY BOTTOM SECTION */}
                      <div className="space-y-4" >
                        <span className="text-sm flex items-center gap-4">
                          {renderStoryLikes(story?.likes, story)}
                        </span>
                        <p className="text-sm capitalize">{story?.message}</p>


                      </div>
                    </div>
                  )
                })}
            </Slider >
          </div >
        </div >
      )}
    </>
  );
};



export default Story;
