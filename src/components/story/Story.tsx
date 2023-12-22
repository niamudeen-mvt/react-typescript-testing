import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { sendNotification } from "../../utils/notifications";
import { deleteStory } from "../../services/api/user";
import { formattedDate } from "../../utils/helper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../../context/authContext";
import { TShowStoryType2, TStoryType } from "../../utils/types";

type TStory = {
  username?: string;
  type: string;
  show: boolean;
  link?: string | undefined;
  message: string;
  postDate: string;
};

interface IProps {
  showStory: TStory;
  showStory2: TShowStoryType2;
  fetchStories: () => Promise<void>;
  setShowStory: React.Dispatch<React.SetStateAction<TStory>>;
  setShowStory2: React.Dispatch<React.SetStateAction<TShowStoryType2>>;
  PERSONAL: TStoryType;
  SOCIAL: [];
}

const Story = ({
  showStory,
  showStory2,
  fetchStories,
  setShowStory,
  PERSONAL,
  SOCIAL,
  setShowStory2,
}: IProps) => {
  const [seconds, setSeconds] = useState(15);
  const { authUser } = useAuth();
  const handleDelteStory = async (storyId: string) => {
    let res = await deleteStory(storyId);
    if (res.status === 200) {
      fetchStories();
      sendNotification("success", res.data.message);
    } else {
      sendNotification("error", res?.response?.data?.message);
    }
    setShowStory({
      username: "",
      type: "",
      show: false,
      link: "",
      message: "",
      postDate: "",
    });
  };

  const STORIES =
    authUser._id === showStory2.userId
      ? PERSONAL
      : SOCIAL.find(
          (obj: { userId: { _id: string } }) =>
            obj.userId._id === showStory2.userId
        );

  // story timer

  useEffect(() => {
    if (seconds === 0) {
      setShowStory2({
        type: "",
        userId: "",
        isShow: false,
      });
    }

    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  });

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center p-10">
      <div className=" text-white fixed top-10 right-10 cursor-pointer flex gap-x-4">
        <p className="text-white">{seconds < 10 ? "0" + seconds : seconds}</p>
        <IoClose
          size={22}
          className="cursor-pointer"
          onClick={() => {
            setShowStory({
              username: "",
              type: "",
              show: false,
              link: "",
              message: "",
              postDate: "",
            });

            setShowStory2({
              type: "",
              userId: "",
              isShow: false,
            });
          }}
        />
      </div>

      <div className="bg-white w-full lg:w-1/2 ">
        <Slider {...settings} className="bg-white">
          {STORIES?.stories?.length &&
            STORIES.stories.map((story) => {
              return (
                <div className="flex flex-col gap-y-5 border p-5 bg-white text-black">
                  <div className="flex gap-x-8">
                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-center text-sm">
                        @{STORIES.userId.name}
                      </h1>
                      {showStory2.type === "PERSONAL" ? (
                        <MdDelete
                          size={22}
                          className="hover:scale-110 transition-all duration-300 cursor-pointer"
                          onClick={() => handleDelteStory(story._id)}
                        />
                      ) : null}
                    </div>
                  </div>

                  {/* <span className=" text-xs">
                    {formattedDate(new Date(STORIES.createdAt))}
                  </span> */}

                  <div className="h-[400px]">
                    <img
                      src={story.image}
                      alt="story"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm capitalize">{story.message}</p>
                </div>
              );
            })}
        </Slider>
      </div>

      {/* <div className="w-[500px] flex  flex-col gap-y-5 border p-5 bg-white text-black">
        <div className="flex gap-x-8">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-center text-sm">@{showStory.username}</h1>
            {showStory.type === "PERSONAL" ? (
              <MdDelete
                size={22}
                className="hover:scale-110 transition-all duration-300 cursor-pointer"
                onClick={() => handleDelteStory()}
              />
            ) : null}
          </div>
        </div>

        <span className=" text-xs">
          {formattedDate(new Date(showStory.postDate))}
        </span>

        {showStory.link ? (
          <div className="h-[400px]">
            <img
              src={showStory.link}
              alt="story"
              className="w-full h-full object-contain"
            />
          </div>
        ) : null}
        <p className="text-sm capitalize">{showStory.message}</p>
      </div> */}
    </div>
  );
};

export default Story;
