import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { sendNotification } from "../../utils/notifications";
import { useAuth } from "../../context/authContext";
import { formattedDate } from "../../utils/helper";
import { TShowStoryType2, TStoryType } from "../../utils/types";
import defaultStory from "../../assets/images/default-story.avif";
import { FaHeart } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { RootState } from "../../store";
import {
  deleteStory,
  deleteUploadcareImg,
  likeStory,
} from "../../services/api/user";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IProps {
  PERSONAL: TStoryType | undefined;
  SOCIAL: TStoryType[];
  showStory2: TShowStoryType2;
  fetchStories: () => Promise<void>;
  setShowStory2: React.Dispatch<React.SetStateAction<TShowStoryType2>>;
  setStories: React.Dispatch<React.SetStateAction<TStoryType[]>>;
}

const Story = ({
  showStory2,
  PERSONAL,
  SOCIAL,
  fetchStories,
  setShowStory2,
  setStories,
}: IProps) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const { authUser } = useAuth();
  const [seconds, setSeconds] = useState(30);
  const [showLikes, setShowLikes] = useState(false);

  const SLIDER_SETTINGS = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  //  STORY TIMER

  useEffect(() => {
    if (seconds === 0) {
      setShowStory2({
        type: "",
        userId: "",
        isShow: false,
      });
      return;
    }
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  });

  const handleDelteStory = async (storyId: string, fileUrl: string) => {
    dispatch(startLoading());

    if (fileUrl) {
      const fileId = fileUrl?.split("/")[0];
      await deleteUploadcareImg(fileId);
    }
    let res = await deleteStory(storyId);

    if (res.status === 200) {
      fetchStories();
      sendNotification("success", res.data.message);
    } else {
      sendNotification("error", res?.response?.data?.message);
    }
    setShowStory2({
      type: "",
      userId: "",
      isShow: false,
    });
    dispatch(stopLoading());
  };

  const handleStoryLikes = async (
    storyId: string,
    storyUserId: string | undefined
  ) => {
    if (storyId && storyUserId) {
      let res = await likeStory({ storyId: storyId, storyUserId });
      if (res.status === 200) {
        // sendNotification("success", res?.data?.message);
        setStories(res?.data?.stories);
      } else {
        sendNotification("error", res?.response?.data?.message);
      }
    }
  };

  const STORIES_RESULT =
    authUser?._id === showStory2?.userId
      ? PERSONAL
      : SOCIAL?.find(
          (obj: TStoryType) => obj?.userId?._id === showStory2?.userId
        );

  const USERNAME =
    STORIES_RESULT?.userId?.name && `@${STORIES_RESULT?.userId?.name}`;

  const STORIES = STORIES_RESULT?.stories || [];

  function renderCloseButton() {
    const SECONDS = seconds < 10 ? "0" + seconds : seconds;
    return (
      <div className="flex gap-x-2">
        <p className="text-white">{SECONDS}</p>
        <IoClose
          size={22}
          className="cursor-pointer"
          onClick={() => {
            setShowStory2({
              type: "",
              userId: "",
              isShow: false,
            });
          }}
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
    const IS_ALREADY_LIKED =
      storyLikes &&
      storyLikes.length > 0 &&
      storyLikes.map((e: any) => e.userId).includes(authUser._id);
    return (
      <>
        {storyLikes && storyLikes.length > 0 ? (
          <button
            disabled={IS_ALREADY_LIKED}
            onClick={() =>
              handleStoryLikes(story._id, STORIES_RESULT?.userId?._id)
            }
            className="flex gap-x-2"
          >
            <FaHeart size={22} fill="red" />
            <span>{story.likes.length}</span>
          </button>
        ) : (
          <button
            onClick={() =>
              handleStoryLikes(story._id, STORIES_RESULT?.userId?._id)
            }
            disabled={isLoading || STORIES_RESULT?.userId?._id === authUser._id}
            className="hover:scale-125 transition-all duration-300 cursor-pointer"
          >
            <GoHeart size={22} />
          </button>
        )}
      </>
    );
  }

  function renderDeleteStory(story: any) {
    const { _id: id, image } = story;
    return (
      <>
        {showStory2.type === "PERSONAL" ? (
          <MdDelete
            size={22}
            className="hover:scale-125 transition-all duration-300 cursor-pointer"
            onClick={() => handleDelteStory(id, image)}
          />
        ) : null}
      </>
    );
  }

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center p-10">
      <div className="text-white fixed top-10 right-10 cursor-pointer flex gap-x-4">
        {renderCloseButton()}
      </div>

      <div className="bg-white w-full max-w-[450px] min-h-[600px] relative">
        <Slider {...SLIDER_SETTINGS}>
          {STORIES &&
            STORIES?.length &&
            STORIES.map((story) => {
              return (
                <div className="flex flex-col gap-y-5  p-5 bg-white text-black relative">
                  {/* STORY TOP SECTION */}
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-center text-sm font-semibold">
                        {USERNAME && USERNAME}
                      </h1>
                      <span className="text-xs">
                        {formattedDate(new Date(story.createdAt))}
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
                        story.image
                          ? `https://ucarecdn.com/${story.image}`
                          : defaultStory
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
                    <p className="text-sm capitalize">{story.message}</p>
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
        {isLoading && <div className="absolute inset-0 bg-white/70 z-50"></div>}
      </div>
    </div>
  );
};

export default Story;
