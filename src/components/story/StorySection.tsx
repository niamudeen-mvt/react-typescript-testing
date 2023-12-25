import React from "react";

// types
import { TShowStoryType2, TStoryType } from "../../utils/types";

// libraries
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// icons
import useWindowSize from "../../hooks/useWindowSize";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

interface IProps {
  stories: TStoryType[];
  PERSONAL: TStoryType | undefined;
  SOCIAL: TStoryType[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStory2: React.Dispatch<React.SetStateAction<TShowStoryType2>>;
}

const StorySection = ({
  setShowStory2,
  setShowModal,
  PERSONAL,
  SOCIAL,
}: IProps) => {
  const windowSize = useWindowSize();

  // story section slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-10`}>
      {/* personal story ================== */}
      <div
        className={` ${
          windowSize.width < 992
            ? ""
            : SOCIAL?.length > 1
            ? "col-span-2"
            : "col-span-2"
        }`}
      >
        {PERSONAL?.stories?.length ? (
          <div className="h-48 cursor-pointer flex__center flex-col">
            <div className="h-20 w-20 rounded-full hover:scale-110 transition-all duration-300 bg-white flex__center mb-3 border-4  border-green-500 relative">
              <RiChatHistoryFill
                size={25}
                onClick={() =>
                  setShowStory2({
                    type: "PERSONAL",
                    userId: PERSONAL.userId._id,
                    isShow: true,
                  })
                }
                color="black"
              />
              <span className="absolute right-0 top-14 bg-white rounded-full p-1 border-black border-2">
                <FaPlus
                  onClick={() => setShowModal(true)}
                  className="text-xs"
                  color="black"
                />
              </span>
            </div>
            <p className="text-white text-xs text-center">
              @{PERSONAL?.userId?.name}
            </p>
          </div>
        ) : (
          // adding story
          <div className="h-48 flex__center flex-col">
            <div className="cursor-pointer h-20 w-20  rounded-full bg-white flex__center border-4 border-slate-600 mb-3">
              <FaPlus
                size={25}
                onClick={() => setShowModal(true)}
                className="hover:scale-110 transition-all duration-300 text-slate-60"
              />
            </div>
            <p className="text-white text-xs text-center">
              @{PERSONAL?.userId?.name}
            </p>
          </div>
        )}
      </div>

      {/* story slider   =========================== */}
      <div
        className={` ${
          windowSize.width < 992
            ? ""
            : SOCIAL?.length === 1
            ? "col-span-2"
            : SOCIAL?.length === 2
            ? "col-span-4"
            : SOCIAL?.length === 3
            ? "col-span-6"
            : SOCIAL?.length === 4
            ? "col-span-8"
            : SOCIAL?.length === 5
            ? "col-span-10"
            : "col-span-10"
        }`}
      >
        <Slider {...settings}>
          {SOCIAL
            ? SOCIAL.map((obj: TStoryType, i: number) => {
                return (
                  <div
                    className="h-48 cursor-pointer flex__center flex-col add__story"
                    key={obj.userId._id}
                  >
                    <div className="h-20 w-20 rounded-full hover:scale-110 transition-all duration-300 bg-white flex__center mb-3">
                      <RiChatHistoryFill
                        size={25}
                        onClick={() =>
                          setShowStory2({
                            type: "SOCIAL",
                            userId: obj.userId._id,
                            isShow: true,
                          })
                        }
                        color="black"
                      />
                    </div>
                    <p className="text-xs text-center text-white">
                      @{obj.userId.name}
                    </p>
                  </div>
                );
              })
            : null}
        </Slider>
      </div>
    </div>
  );
};

export default StorySection;
