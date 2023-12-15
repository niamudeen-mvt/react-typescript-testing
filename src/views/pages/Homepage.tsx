import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import ReactTyped from "react-typed";
import TaskPage from "./tasks";

const Homepage: FC = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  console.log("signup page rendered", user);

  if (isLoading)
    return (
      <div className="flex__center h-screen text-white bg-slate-500">
        Loading............
      </div>
    );
  return (
    <>
      {isAuthenticated ? (
        <TaskPage />
      ) : (
        <section className="bg-slate-500">
          <div className="custom__container flex__center h-screen">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-semibold mb-10 text-white">
                Welcome to{` `}
                <ReactTyped strings={[`Taskfiy`]} typeSpeed={200} loop />
              </h1>
              {isAuthenticated ? null : (
                <button
                  className="bg-slate-700 px-12 py-4 text-white rounded-lg hover:bg-slate-600"
                  onClick={() => loginWithRedirect()}
                >
                  login
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Homepage;
