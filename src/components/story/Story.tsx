import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { sendNotification } from "../../utils/notifications";
import { useAuth } from "../../context/authContext";
import { formattedDate } from "../../utils/helper";
import { TShowStoryType2, TStoryType } from "../../utils/types";
import defaultStory from "../../assets/images/default-story.avif";
import { FaHeart } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { RootState } from "../../store";
import {
  deleteStory,
  deleteUploadcareImg,
  likeStory,
} from "../../services/api/user";

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
  const [seconds, setSeconds] = useState(30);
  const { authUser } = useAuth();
  const [showLikes, setShowLikes] = useState(false);

  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  const STORIES =
    authUser._id === showStory2.userId
      ? PERSONAL
      : SOCIAL.find((obj: TStoryType) => obj.userId._id === showStory2.userId);

  // slider settings

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  // story timer

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

  // deleting user story
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

  // liking user stories
  const handleStoryLikes = async (
    storyId: string,
    storyUserId: string | undefined
  ) => {
    if (storyId && storyUserId) {
      let res = await likeStory({ storyId: storyId, storyUserId });
      if (res.status === 200) {
        sendNotification("success", res?.data?.message);
        setStories(res?.data?.stories);
      } else {
        sendNotification("error", res?.response?.data?.message);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center p-10">
      <div className="text-white fixed top-10 right-10 cursor-pointer flex gap-x-4">
        <p className="text-white">{seconds < 10 ? "0" + seconds : seconds}</p>
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
      <div className="bg-white w-full lg:w-1/2">
        <Slider {...settings} className="bg-white">
          {STORIES?.stories?.length &&
            STORIES.stories.map((story) => {
              // checking if story is already liked
              const isAlreadyLiked = story.likes
                .map((e: any) => e.userId)
                .includes(authUser._id);
              return (
                <div className="flex flex-col gap-y-5  p-5 bg-white text-black relative">
                  {/* story details */}
                  <>
                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-center text-sm">
                        @{STORIES.userId.name}
                      </h1>
                      <div className="flex gap-x-6">
                        {/* like secton */}
                        <span className="text-sm flex items-center gap-4">
                          {story.likes.length ? (
                            <button
                              disabled={isAlreadyLiked}
                              onClick={() =>
                                handleStoryLikes(story._id, STORIES.userId._id)
                              }
                              className="flex gap-x-2"
                            >
                              <FaHeart size={25} fill="red" />
                              <span>{story.likes.length}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleStoryLikes(story._id, STORIES.userId._id)
                              }
                              disabled={
                                isLoading || STORIES.userId._id === authUser._id
                              }
                              className="hover:scale-125 transition-all duration-300 cursor-pointer"
                            >
                              <GoHeart size={24} />
                            </button>
                          )}
                        </span>

                        {story.likes.length > 0 && (
                          <IoIosArrowForward
                            size={22}
                            onClick={() => setShowLikes(!showLikes)}
                            className="cursor-pointer"
                          />
                        )}

                        {/* delete section */}
                        {showStory2.type === "PERSONAL" ? (
                          <MdDelete
                            size={22}
                            className="hover:scale-125 transition-all duration-300 cursor-pointer"
                            onClick={() =>
                              handleDelteStory(story._id, story.image)
                            }
                          />
                        ) : null}
                      </div>
                    </div>

                    <span className=" text-xs">
                      {formattedDate(new Date(story.createdAt))}
                    </span>

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
                    <p className="text-sm capitalize">{story.message}</p>
                  </>

                  {/* users like list */}
                  <div
                    className={`absolute bottom-0 left-0 w-full  bg-blue-500/50 rounded-t-3xl flex__center transition-all duration-300 ${
                      showLikes ? "h-[90%]" : "h-0"
                    }`}
                  >
                    <ul className="h-3/4 w-1/3  overflow-auto">
                      {story.likes.length
                        ? story.likes.map((like: any, index: number) => {
                            return (
                              <li className="text-white flex items-center gap-x-4 mb-4">
                                {index + 1}
                                <FaHeart size={18} fill="red" />
                                <p>@{like.name}</p>
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Story;
