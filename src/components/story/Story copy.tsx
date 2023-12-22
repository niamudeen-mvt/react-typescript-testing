import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { sendNotification } from "../../utils/notifications";
import { deleteStory } from "../../services/api/user";
import { formattedDate } from "../../utils/helper";
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
  showStory: TStory;
  fetchStories: () => Promise<void>;
  setShowStory: React.Dispatch<React.SetStateAction<TStory>>;
}

const Story = ({ showStory, fetchStories, setShowStory }: IProps) => {
  const [seconds, setSeconds] = useState(15);

  const handleDelteStory = async () => {
    let res = await deleteStory();
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

  // story timer
  useEffect(() => {
    if (seconds === 0) {
      setShowStory({
        username: "",
        type: "",
        show: false,
        link: "",
        message: "",
        postDate: "",
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center">
      <div className="text-white fixed top-10 right-10 cursor-pointer flex gap-x-4">
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
          }}
        />
      </div>

      {/* <div>
        <Slider {...settings}>
          <div className="w-[500px] flex  flex-col gap-y-5 border p-5 bg-white text-black">
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
          </div>
        </Slider>
      </div> */}

      <div className="w-[500px] flex  flex-col gap-y-5 border p-5 bg-white text-black">
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
      </div>
    </div>
  );
};

export default Story;
