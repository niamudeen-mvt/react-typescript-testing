import { RiChatHistoryFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showStory } from "../../store/features/storySlice";
import { useAuth } from "../../context/authContext";
import { FaPlus } from "react-icons/fa";
import { showStoryUploader } from "../../store/features/storyUploaderSlice";
import { useState } from "react";
import Story from "./Story";

type StorySliderProps = {
  stories: [];
};

const TIMER: number = 30;

export default function StorySlider({ stories }: StorySliderProps) {
  const dispatch = useDispatch();
  const { authUser } = useAuth();
  const [seconds, setSeconds] = useState(TIMER);
  const clickToSeeStory = (userId: string) => {
    if (!stories || !userId) return;

    const existingStory: any = stories.find((el: any) => el.userId === userId);

    if (existingStory) {
      dispatch(
        showStory({
          type: "SOCIAL",
          userId,
          show: true,
          stories: existingStory?.stories,
        })
      );
      setSeconds(TIMER);
      return;
    } else {
      console.log("No story found");
    }
  };

  const renderAddStory = () => {
    return (
      <div className="h-48 flex__center flex-col">
        <div className="cursor-pointer h-20 w-20  rounded-full bg-white flex__center border-4 border-black mb-3">
          <FaPlus
            size={25}
            onClick={() => dispatch(showStoryUploader(true))}
            className="hover:scale-110 transition-all duration-300 text-slate-60 text-black"
          />
        </div>
        <p className="text-white text-xs text-center">Add Story</p>
      </div>
    );
  };

  const renderPersonalStory = (story: any) => {
    return (
      <div
        className="h-48 cursor-pointer flex__center flex-col"
        key={story._id}
      >
        <div className="h-20 w-20 rounded-full hover:scale-110 transition-all duration-300 bg-white flex__center mb-3 border-4  border-green-500 relative">
          <RiChatHistoryFill
            size={25}
            color="black"
            onClick={() => clickToSeeStory(story.userId)}
          />
          <span className="absolute right-0 top-14 bg-white rounded-full p-1 border-black border-2">
            <FaPlus
              onClick={() => dispatch(showStoryUploader(true))}
              className="text-xs"
              color="black"
            />
          </span>
        </div>
        <p className="text-white text-xs text-center">
          {story.username && `@${story.username}`}
        </p>
      </div>
    );
  };

  const personalStories =
    (stories &&
      stories?.filter((story: any) => story.userId === authUser?._id)) ||
    [];

  const otherStories =
    (stories &&
      stories?.filter((story: any) => story.userId !== authUser?._id)) ||
    [];

  return (
    <>
      <div className="flex gap-10 overflow-hidden max-w-[100%] w-full overflow-x-auto hide__scrollbar">
        <div className="w-[40%] sm:w-[20%]">
          {personalStories.length > 0
            ? personalStories.map((story: any) => {
                return renderPersonalStory(story);
              })
            : renderAddStory()}
        </div>
        <div className="flex w-[60%] sm:w-[80%]">
          {otherStories.length > 0
            ? otherStories.map((story: any) => {
                return (
                  <>
                    <div
                      className="h-48 cursor-pointer flex__center flex-col add__story"
                      key={story.userId}
                    >
                      <div className="h-20 w-20 rounded-full hover:scale-110 transition-all duration-300 bg-white flex__center mb-3">
                        <RiChatHistoryFill
                          size={25}
                          onClick={() => clickToSeeStory(story.userId)}
                          color="black"
                        />
                      </div>
                      <p className="text-xs text-center text-white">
                        {story.username}
                      </p>
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </div>
      <Story stories={stories} seconds={seconds} setSeconds={setSeconds} />
    </>
  );
}
