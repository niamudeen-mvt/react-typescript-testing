import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../services/api/user";

import { TStoryType } from "../../utils/types";
import Loader from "../Loader";
import StorySlider from "./StorySlider";

const Stories = () => {
  const fetchStories = async () => {
    const response = await getStories();
    const stories = response?.data?.stories;

    if (stories?.length > 0) {
      return stories.filter(
        (activeStory: TStoryType) =>
          activeStory.stories && activeStory.stories?.length > 0
      );
    }
    return [];
  };
  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="mb-32">
        <StorySlider stories={stories} />
      </div>
    </>
  );
};

export default Stories;
