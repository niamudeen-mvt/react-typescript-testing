import React from "react";

import { TShowStoryType2, TStoryType } from "../../utils/types";

import { RiChatHistoryFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import StorySlider from "./StorySlider";

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
  const USERNAME = PERSONAL?.userId?.name && `@${PERSONAL?.userId?.name}`;

  function renderAddStory() {
    return (
      <div className="h-48 flex__center flex-col">
        <div className="cursor-pointer h-20 w-20  rounded-full bg-white flex__center border-4 border-black mb-3">
          <FaPlus
            size={25}
            onClick={() => setShowModal(true)}
            className="hover:scale-110 transition-all duration-300 text-slate-60"
          />
        </div>
        <p className="text-white text-xs text-center">Add Story</p>
      </div>
    );
  }

  function renderPersonalStory() {
    return (
      <div className="h-48 cursor-pointer flex__center flex-col">
        <div className="h-20 w-20 rounded-full hover:scale-110 transition-all duration-300 bg-white flex__center mb-3 border-4  border-green-500 relative">
          <RiChatHistoryFill
            size={25}
            onClick={() =>
              setShowStory2({
                type: "PERSONAL",
                userId: PERSONAL?.userId?._id,
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
        <p className="text-white text-xs text-center">{USERNAME}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-5 sm:gap-10">
      <div className="w-[20%]">
        {PERSONAL?.stories?.length ? renderPersonalStory() : renderAddStory()}
      </div>
      <div className="w-[80%] overflow-hidden">
        <StorySlider stories={SOCIAL} setShowStory2={setShowStory2} />
      </div>
    </div>
  );
};

export default StorySection;
