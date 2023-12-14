import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import ReactTyped from "react-typed";
import TaskPage from "./TaskPage";

const Homepage: FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

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
                  className="bg-slate-700 px-12 py-4 text-white rounded-lg"
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
