import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import ReactTyped from "react-typed";

const Login: FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <section>
      <div className="custom__container flex__center h-screen">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-10">
            Welcome to{` `}
            <ReactTyped strings={[`Taskfiy`]} typeSpeed={200} loop />
          </h1>
          {isAuthenticated ? null : (
            <button
              className="bg-blue-600 px-10 py-2 text-white rounded-lg"
              onClick={() => loginWithRedirect()}
            >
              login
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
