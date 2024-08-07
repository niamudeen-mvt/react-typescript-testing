import { useEffect, useState } from "react";
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
import { MdDelete } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { hideStory } from "../../store/features/storySlice";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const [showLikes, setShowLikes] = useState(false);

  const activeStoryData = stories?.find(
    (story) => story?.userId === activeStory.userId
  ) || { stories: [] };

  const SLIDER_SETTINGS = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  useEffect(() => {
    if (seconds === 0) {
      dispatch(hideStory());
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const deleteStoryHandler = async (storyId: string, fileUrl: string) => {
    const fileId = fileUrl?.split("/")[0];
    await deleteUploadcareImg(fileId);

    const response: any = await deleteStory(storyId);
    return response;
  };

  const handleStoryLikes = async (storyId: string, storyUserId: string) => {
    const response = await likeStory({ storyId, storyUserId });
    return response;
  };

  const { mutate, isPending: isLikePending } = useMutation({
    mutationFn: (payload: any) =>
      handleStoryLikes(payload?.storyId, payload?.userId),
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
    dispatch(hideStory());
  };

  function renderCloseButton() {
    const SECONDS = seconds < 10 ? "0" + seconds : seconds;
    return (
      <div className="flex gap-x-2">
        <p className="text-white">{seconds}</p>
        <IoClose
          size={22}
          className="cursor-pointer text-white"
          onClick={clickToCloseStory}
        />
      </div>
    );
  }

  function renderStoryLikesList(storyLikes: any) {
    return (
      <ul className="h-3/4 overflow-auto w-full">
        {storyLikes?.length > 0 &&
          storyLikes.map((like: any) => {
            const NAME_SYMBOL = like?.name?.substring(0, 1);
            const USERNAME = like?.name && `@${like?.name}`;
            return (
              <li className="flex items-center gap-x-4 mb-4 bg-white text-black p-3 w-[300px] mx-auto rounded-xl text-xs">
                <div className="bg-black text-white p-2 w-8 rounded-full flex__center uppercase">
                  {NAME_SYMBOL && NAME_SYMBOL}
                </div>
                <p className="text-black">{USERNAME}</p>
              </li>
            );
          })}
      </ul>
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
            onClick={() => mutate({ storyId: story._id, userId: story.userId })}
            className="flex gap-x-2"
          >
            <FaHeart size={22} fill="red" />
            <span>{story.likes.length}</span>
          </button>
        ) : (
          <button
            disabled={isLikePending}
            onClick={() => mutate({ storyId: story._id, userId: story.userId })}
            className="hover:scale-125 transition-all duration-300 cursor-pointer"
          >
            <GoHeart size={22} />
          </button>
        )}
      </>
    );
  }

  function renderDeleteStory(story: any) {
    if (!story?.image) return;
    return (
      <>
        {story.userId === authUser._id && (
          <MdDelete
            size={22}
            className="hover:scale-125 transition-all duration-300 cursor-pointer"
            onClick={() =>
              mutateDelete({ storyId: story?._id, fileUrl: story.image })
            }
          />
        )}
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
                      className="flex flex-col gap-y-5  p-5 bg-white text-black relative"
                      key={story?._id}
                    >
                      {/* STORY TOP SECTION */}
                      <div className="flex justify-between">
                        <div>
                          <h1 className="text-center text-sm font-semibold">
                            {story?.username}
                          </h1>
                          <span className="text-xs">
                            {new Date(story?.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-x-2">
                          {story?.likes?.length > 0 && (
                            <p
                              className="text-xs text-blue-500 underline cursor-pointer"
                              onClick={() => setShowLikes(!showLikes)}
                            >
                              See likes
                            </p>
                          )}

                          {renderDeleteStory(story)}
                        </div>
                      </div>

                      {/* STORY MIDDLE SECTION */}
                      <div className="h-[400px] mb-4">
                        <img
                          src={
                            story?.image
                              ? `https://ucarecdn.com/${story?.image}`
                              : ""
                          }
                          alt="story"
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* STORY BOTTOM SECTION */}
                      <div className="space-y-4">
                        <span className="text-sm flex items-center gap-4">
                          {renderStoryLikes(story?.likes, story)}
                        </span>
                        <p className="text-sm capitalize">{story?.message}</p>
                      </div>

                      {/* STORY LIKES LIST */}
                      <div
                        className={`absolute bottom-0 left-0 w-full  bg-gray-100 shadow-2xl rounded-t-3xl flex__center transition-all duration-300 ${
                          showLikes ? "h-[90%]" : "h-0"
                        }`}
                      >
                        {renderStoryLikesList(story?.likes)}
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default Story;
