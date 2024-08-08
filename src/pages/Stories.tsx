import { useAuth } from "../context/authContext";
import ThemeContainer from "../components/layout/ThemeContainer";
import Stories from "../components/story";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PostStory from "../components/story/PostStory";
import TextContent from "../components/TextContent";

const StoriesPage = () => {
  const { isLoggedIn, authUser } = useAuth();
  const showStoryUploader = useSelector(
    (state: RootState) => state.storyUploader.show
  );
  return (
    <ThemeContainer themeCenter={isLoggedIn ? false : true}>
      <div className="w-full">
        {showStoryUploader && <PostStory />}
        {!showStoryUploader && isLoggedIn && (
          <>
            <Stories />
            <TextContent
              redirectTo="/tasks"
              heading={`Welcome ${authUser.name && authUser.name}   to`}
              btnText="Go to tasks"
              subHeading="Create and manage tasks with ease"
            />
          </>
        )}
      </div>
    </ThemeContainer>
  );
};



export default StoriesPage;
