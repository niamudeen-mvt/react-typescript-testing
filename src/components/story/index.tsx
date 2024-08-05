import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactTyped from "react-typed";
import { useAuth } from "../../context/authContext";
import { getStories } from "../../services/api/user";
import ThemeContainer from "../layout/ThemeContainer";
import CustomModal from "../layout/CustomModal";
import CustomLoader from "../Loader";
import PostStory from "./PostStory";
import Story from "./Story";
import StorySection from "./StorySection";
import { TShowStoryType2, TStoryDetails, TStoryType } from "../../utils/types";

const Stories = () => {
  const [stories, setStories] = useState<TStoryType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [story, setStory] = useState<TStoryDetails>({
    message: "",
    image: "",
  });

  const [showStory2, setShowStory2] = useState<TShowStoryType2>({
    type: "",
    userId: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuth();

  // fetching stories
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setIsLoading(true);
    let res = await getStories();
    if (res.status === 200) {
      setStories(res?.data?.stories);
    } else {
      setStories([]);
    }
    setIsLoading(false);
  };

  // seperating personal and other users stories
  const PERSONAL: TStoryType | undefined = stories?.find(
    (story: TStoryType) => story.userId?._id === authUser?._id
  );

  const SOCIAL: TStoryType[] = stories?.filter(
    (story: TStoryType) =>
      story.userId &&
      story.userId?._id !== authUser?._id &&
      story.stories?.length > 0
  );

  return (
    <>
      {isLoading ? (
        <CustomLoader content="stories" />
      ) : (
        <section className="mb-32 flex flex-col gap-y-32">
          <StorySection
            stories={stories}
            setShowModal={setShowModal}
            setShowStory2={setShowStory2}
            PERSONAL={PERSONAL}
            SOCIAL={SOCIAL}
          />
          <div className="text-center flex flex-col gap-y-5">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white">
              Welcome {authUser?.name} to
              {` `}
              <ReactTyped strings={[`Taskfiy`]} typeSpeed={200} loop />
            </h1>
            <p>Ready to create your task list for today. !!!!!!!</p>
            <Link to="/tasks">
              <button className="bg-slate-700 px-12 py-4 text-white rounded-lg hover:bg-slate-600">
                Go to tasks
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* story posting form */}
      {showModal ? (
        <CustomModal showModal={showModal}>
          <ThemeContainer themeCenter={true}>
            {isLoading ? <CustomLoader /> : null}

            <PostStory
              story={story}
              setShowModal={setShowModal}
              fetchStories={fetchStories}
              setStory={setStory}
            />
          </ThemeContainer>
        </CustomModal>
      ) : null}

      {/* full preview story */}
      {showStory2.isShow ? (
        <Story
          showStory2={showStory2}
          setShowStory2={setShowStory2}
          fetchStories={fetchStories}
          PERSONAL={PERSONAL}
          SOCIAL={SOCIAL}
          setStories={setStories}
        />
      ) : null}
    </>
  );
};

export default Stories;
