import { RiChatHistoryFill } from "react-icons/ri";
import { TShowStoryType2, TStoryType } from "../../utils/types";

type StorySliderProps = {
  stories: TStoryType[];
  setShowStory2: React.Dispatch<React.SetStateAction<TShowStoryType2>>;
};

export default function StorySlider({
  stories,
  setShowStory2,
}: StorySliderProps) {
  const STORIES =
    (stories &&
      stories.length > 0 &&
      stories.map((story) => {
        return {
          userId: story?.userId?._id,
          username: story?.userId?.name,
        };
      })) ||
    [];

  return (
    <div className="flex gap-10 overflow-hidden max-w-[100%] w-full overflow-x-auto hide__scrollbar ">
      {STORIES.length > 0
        ? STORIES.map((story: any) => {
            return (
              <div
                className="h-48 cursor-pointer flex__center flex-col add__story"
                key={story.userId}
              >
                <div className="h-20 w-20 rounded-full hover:scale-110 transition-all duration-300 bg-white flex__center mb-3">
                  <RiChatHistoryFill
                    size={25}
                    onClick={() =>
                      setShowStory2({
                        type: "SOCIAL",
                        userId: story.userId,
                        isShow: true,
                      })
                    }
                    color="black"
                  />
                </div>
                <p className="text-xs text-center text-white">
                  {story.username}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
}
