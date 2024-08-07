import { RiChatHistoryFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import StorySlider from "./StorySlider";
import { useDispatch } from "react-redux";
import { showStoryUploader } from "../../store/features/storyUploaderSlice";

interface IProps {
  stories: [];
}

const StorySection = ({ stories }: IProps) => {
  return (
    <div className="flex gap-5 sm:gap-10 w-[80%] overflow-hidden">
      <StorySlider stories={stories} />
    </div>
  );
};

export default StorySection;
