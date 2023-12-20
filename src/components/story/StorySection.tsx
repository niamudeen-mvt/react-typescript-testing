import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { useAuth } from "../../context/authContext";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type TStory = {
  username?: string;
  type: string;
  show: boolean;
  link?: string | undefined;
  message: string;
  postDate: string;
};

interface IProps {
  stories: never[];
  setShowStory: React.Dispatch<React.SetStateAction<TStory>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const StorySection = ({ stories, setShowModal, setShowStory }: IProps) => {
  const windowSize = useWindowSize();
  const { authUser } = useAuth();

  const personalStory: any = stories?.find(
    (story: { userId: { _id: string } }) => story.userId._id === authUser._id
  );

  const socialStories: any = stories?.filter(
    (story: { userId: string }) => story.userId !== authUser._id
  );

  // story slider settings ================

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      windowSize.width <= 546
        ? 1
        : windowSize.width >= 546 && windowSize.width <= 746
        ? 2
        : windowSize.width <= 992
        ? 3
        : socialStories.length > 4
        ? 4
        : socialStories.length,
    slidesToScroll: 1,
  };

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-10`}>
      {/* personal story ================== */}
      <div
        className={` ${
          windowSize.width < 992
            ? ""
            : socialStories?.length > 1
            ? "col-span-2"
            : "col-span-2"
        }`}
      >
        {personalStory ? (
          <>
            <div className="h-48 cursor-pointer relative">
              {personalStory?.image ? (
                <img
                  src={personalStory?.image}
                  alt="story"
                  className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300 cursor-pointer border-4 border-green-500"
                  onClick={() =>
                    setShowStory({
                      username: personalStory.userId.name,
                      type: "PERSONAL",
                      show: true,
                      link: personalStory.image,
                      message: personalStory.message,
                      postDate: personalStory.createdAt,
                    })
                  }
                />
              ) : (
                // if no story image added by user showing default image
                <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300 bg-white flex__center border-4  border-green-500">
                  <RiChatHistoryFill
                    size={25}
                    onClick={() =>
                      setShowStory({
                        username: personalStory.userId.name,
                        type: "PERSONAL",
                        show: true,
                        link: "",
                        message: personalStory.message,
                        postDate: personalStory.createdAt,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          // add story ================

          <div key={personalStory?._id} className="h-48 flex__center">
            <div className="cursor-pointer h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-white flex__center border-4 border-green-500">
              <FaPlus
                size={25}
                onClick={() => setShowModal(true)}
                className="hover:scale-110 transition-all duration-300 text-slate-600"
              />
            </div>
            {/* <p className="text-xs text-center">@{authUser.name}</p> */}
          </div>
        )}
      </div>

      {/* story slider   =========================== */}
      <div
        className={` ${
          windowSize.width < 992
            ? ""
            : socialStories?.length === 1
            ? "col-span-2"
            : socialStories?.length === 2
            ? "col-span-4"
            : socialStories?.length === 3
            ? "col-span-6"
            : socialStories?.length === 4
            ? "col-span-8"
            : socialStories?.length === 5
            ? "col-span-10"
            : "col-span-10"
        }`}
      >
        <Slider {...settings}>
          {socialStories?.map(
            (story: {
              _id: string;
              image: string;
              message: string;
              createdAt: string;
              userId: {
                name: string;
              };
            }) => {
              return (
                <>
                  <div
                    key={story?._id}
                    className="cursor-pointer h-44 relative"
                    onClick={() =>
                      setShowStory({
                        username: story.userId.name,
                        type: "SOCIAL",
                        show: true,
                        link: story.image,
                        message: story.message,
                        postDate: story.createdAt,
                      })
                    }
                  >
                    {story.image ? (
                      // if my social story has image
                      <img
                        src={story.image}
                        alt="story"
                        className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300"
                      />
                    ) : (
                      // if my social story has no image then showing default icon

                      <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full absolute top-1/4 left-1/4 hover:scale-110 transition-all duration-300 bg-white flex__center">
                        <RiChatHistoryFill
                          size={25}
                          onClick={() =>
                            setShowStory({
                              username: story.userId.name,
                              type: "SOCIAL",
                              show: true,
                              link: "",
                              message: story.message,
                              postDate: story.createdAt,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center">@{story.userId.name}</p>
                </>
              );
            }
          )}
        </Slider>
      </div>
    </div>
  );
};

export default StorySection;
