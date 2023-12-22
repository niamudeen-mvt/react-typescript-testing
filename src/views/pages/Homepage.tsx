import ReactTyped from "react-typed";
import { Link } from "react-router-dom";
import ThemeContainer from "../../components/layout/ThemeContainer";
import { useAuth } from "../../context/authContext";
// import Stories from "../../components/story";

const Homepage = () => {
  const { isLoggedIn, authUser } = useAuth();
  return (
    <ThemeContainer themeCenter={true}>
      {isLoggedIn ? (
        <section>
          <div className="text-center flex flex-col gap-y-5">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white">
              Welcome {authUser?.name}
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
      ) : (
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-10 text-white">
            Welcome to{` `}
            <ReactTyped strings={[`Taskfiy`]} typeSpeed={200} loop />
          </h1>
          <Link to="/login">
            <button className="bg-slate-700 px-12 py-4 text-white rounded-lg hover:bg-slate-600">
              login
            </button>
          </Link>
        </div>
      )}
    </ThemeContainer>
  );
};

export default Homepage;
