import React from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { sendNotification } from "../../utils/notifications";
import { deleteStory } from "../../services/api/user";
import { formattedDate } from "../../utils/helper";

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

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black/90 z-50 flex__center ">
      <IoClose
        size={22}
        className="text-white fixed top-10 right-10 cursor-pointer"
        onClick={() =>
          setShowStory({
            username: "",
            type: "",
            show: false,
            link: "",
            message: "",
            postDate: "",
          })
        }
      />
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
