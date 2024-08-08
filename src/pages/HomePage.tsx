import ThemeContainer from "../components/layout/ThemeContainer";
import TextContent from "../components/TextContent";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { isLoggedIn } = useAuth()
  return (
    <ThemeContainer themeCenter={isLoggedIn ? false : true}>
      <div className="w-full">
        <TextContent
          redirectTo="/login"
          heading="Welcome to"
          btnText="Login"
        />
      </div>
    </ThemeContainer>
  );
};


export default HomePage;
