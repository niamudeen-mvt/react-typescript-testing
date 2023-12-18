import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { useTheme } from "../../context/themeContext";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useAuth } from "../../context/authContext";

type Props = {
  children: React.ReactNode;
  isCenter?: boolean;
};

const ThemeContainer = ({ children, isCenter }: Props) => {
  const { isThemeLight, setIsThemeLight } = useTheme();
  // const { isLoggedIn } = useAuth();
  // const PRIVATE_ROUTES = ["/tasks"];
  // const PUBLIC_ROUTES = ["/login"];
  // const navigate = useNavigate();
  // const routeName = useLocation().pathname;

  // useEffect(() => {
  //   if (PUBLIC_ROUTES.includes(routeName) && isLoggedIn) {
  //     navigate("/tasks");
  //   } else if (PRIVATE_ROUTES.includes(routeName) && !isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [routeName]);
  return (
    <section
      className={`min-h-screen flex__center ${
        isThemeLight ? "bg-slate-500" : "dark__mode"
      }`}
    >
      <div className={`custom__container ${isCenter ? "flex__center" : ""}`}>
        {children}
      </div>
      <div className="flex flex-col gap-4 fixed bottom-10 right-10">
        <FaMoon
          size={25}
          onClick={() => setIsThemeLight(false)}
          className="cursor-pointer"
        />
        <GoSun
          size={25}
          onClick={() => setIsThemeLight(true)}
          className="cursor-pointer"
        />
      </div>
    </section>
  );
};

export default ThemeContainer;
