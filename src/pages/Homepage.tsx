import { Link } from "react-router-dom";
import ReactTyped from "react-typed";
import { useAuth } from "../context/authContext";
import ThemeContainer from "../components/layout/ThemeContainer";
import Stories from "../components/story";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PostStory from "../components/story/PostStory";

const Homepage = () => {
  const { isLoggedIn, authUser } = useAuth();
  const showStoryUploader = useSelector(
    (state: RootState) => state.storyUploader.show
  );
  return (
    <ThemeContainer themeCenter={isLoggedIn ? false : true}>
      <div className="w-full">
        {showStoryUploader && <PostStory />}
        {!showStoryUploader && !isLoggedIn && (
          <>
            <TextContent
              redirectTo="/login"
              heading="Welcome to"
              btnText="Login"
            />
          </>
        )}
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

type TextContentProps = {
  heading: string;
  subHeading?: string;
  redirectTo: string;
  btnText: string;
};

const TextContent = ({
  heading,
  subHeading,
  redirectTo,
  btnText,
}: TextContentProps) => {
  return (
    <div className="text-center flex flex-col gap-y-5">
      <h1 className="text-4xl sm:text-5xl font-semibold text-white">
        {heading}
        <ReactTyped strings={[`Taskfiy`]} typeSpeed={200} loop />
      </h1>
      {subHeading && <p> {subHeading}</p>}
      <Link to={redirectTo}>
        <button className="bg-slate-700 px-12 py-4 text-white rounded-lg hover:bg-slate-600 capitalize">
          {btnText}
        </button>
      </Link>
    </div>
  );
};

export default Homepage;
