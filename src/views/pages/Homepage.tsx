import ReactTyped from "react-typed";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";

const Homepage = () => {
  // const { isLoggedIn } = useAuth();
  // console.log(isLoggedIn);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/tasks");
  //   } else {
  //     navigate("/");
  //   }
  // }, [isLoggedIn]);

  return (
    <section className="bg-slate-500">
      <div className="custom__container flex__center h-screen">
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
      </div>
    </section>
  );
};

export default Homepage;
