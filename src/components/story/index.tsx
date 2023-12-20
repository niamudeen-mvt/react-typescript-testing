import { useEffect, useState } from "react";
import ThemeContainer from "../layout/ThemeContainer";
import CustomModal from "../layout/CustomModal";
import CustomLoader from "../Loader";
import { getStories } from "../../services/api/user";
import PostStory from "./PostStory";
import Story from "./Story";
import StorySection from "./StorySection";

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

  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      {/* story section */}
      <section className="my-32">
        {isLoading ? (
          <CustomLoader />
        ) : (
          <StorySection
            stories={stories}
            setShowStory={setShowStory}
            setShowModal={setShowModal}
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
      {showStory.show ? (
        <Story
          showStory={showStory}
          setShowStory={setShowStory}
          fetchStories={fetchStories}
        />
      ) : null}
    </>
  );
};

export default Stories;
