import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { sendNotification } from "../../utils/notifications";
import { deleteStory, deleteUploadcareImg } from "../../services/api/user";
// import { formattedDate } from "../../utils/helper";
import { useAuth } from "../../context/authContext";
import { TShowStoryType2, TStoryType } from "../../utils/types";
import defaultStory from "../../assets/images/default-story.avif";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
// import { config } from "../../config";

interface IProps {
  PERSONAL: TStoryType | undefined;
  SOCIAL: TStoryType[];
  showStory2: TShowStoryType2;
  fetchStories: () => Promise<void>;
  setShowStory2: React.Dispatch<React.SetStateAction<TShowStoryType2>>;
}

const Story = ({
  showStory2,
  PERSONAL,
  SOCIAL,
  fetchStories,
  setShowStory2,
}: IProps) => {
  const [seconds, setSeconds] = useState(15);
  const { authUser } = useAuth();

  // const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  const STORIES =
    authUser._id === showStory2.userId
      ? PERSONAL
      : SOCIAL.find((obj: TStoryType) => obj.userId._id === showStory2.userId);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

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

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center p-10">
      <div className=" text-white fixed top-10 right-10 cursor-pointer flex gap-x-4">
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
                          className="hover:scale-125 transition-all duration-300 cursor-pointer"
                          onClick={() =>
                            handleDelteStory(story._id, story.image)
                          }
                        />
                      ) : null}
                    </div>
                  </div>

                  {/* <span className=" text-xs">
                    {formattedDate(new Date(STORIES.createdAt))}
                  </span> */}

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
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Story;
