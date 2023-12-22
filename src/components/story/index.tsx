import { useEffect, useState } from "react";
import ThemeContainer from "../layout/ThemeContainer";
import CustomModal from "../layout/CustomModal";
import CustomLoader from "../Loader";
import { getStories } from "../../services/api/user";
import PostStory from "./PostStory";
import Story from "./Story";
import StorySection from "./StorySection";
import { useAuth } from "../../context/authContext";
import { TShowStoryType2, TStoryType } from "../../utils/types";

type TStory = {
  username?: string;
  type: string;
  show: boolean;
  link?: string | undefined;
  message: string;
  postDate: string;
};

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [story, setStory] = useState<any>({
    message: "",
    image: "",
  });
  const [showStory, setShowStory] = useState<TStory>({
    username: "",
    type: "",
    show: false,
    link: "",
    message: "",
    postDate: "",
  });
  const [showStory2, setShowStory2] = useState<TShowStoryType2>({
    type: "",
    userId: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuth();

  // fetching stories =====================
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

  const PERSONAL: any = stories?.find(
    (story: TStoryType) => story.userId._id === authUser._id
  );
  const SOCIAL: any = stories?.filter(
    (story: TStoryType) => story.userId._id !== authUser._id
  );

  return (
    <>
      {/* story section */}
      <section className="mb-32">
        {isLoading ? (
          <CustomLoader />
        ) : (
          <StorySection
            stories={stories}
            setShowStory={setShowStory}
            setShowModal={setShowModal}
            setShowStory2={setShowStory2}
            PERSONAL={PERSONAL}
            SOCIAL={SOCIAL}
          />
        )}
      </section>

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
      {showStory.show || showStory2.isShow ? (
        <Story
          showStory={showStory}
          showStory2={showStory2}
          setShowStory={setShowStory}
          setShowStory2={setShowStory2}
          fetchStories={fetchStories}
          PERSONAL={PERSONAL}
          SOCIAL={SOCIAL}
        />
      ) : null}
    </>
  );
};

export default Stories;
