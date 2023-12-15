import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { project } from "../../utils/constants";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import useWindowSize from "../../hooks/useWindowSize";
import { MENU_ITEMS } from "../../utils/menuItems";

const Header = () => {
  const { logout, isAuthenticated } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const routeName = useLocation().pathname;

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width >= 768) {
      setShowModal(false);
    }
  }, [windowSize.width]);

  const routes = MENU_ITEMS?.filter((route) => {
    if (isAuthenticated && route.id !== project.LOGIN.id) {
      return route;
    } else if (
      !isAuthenticated &&
      route.id !== project.TASKS.id &&
      route.id !== project.POSTS.id
    ) {
      return route;
    }
  });

  return (
    <header>
      <div className="max-w-[1200px] mx-auto  h-20 flex__SB px-10">
        <a href="/" className="text-2xl  font-bold text-slate-500">
          {project.PROJECT_NAME}
        </a>

        <nav
          className={`md:block hidden ${
            showModal
              ? "fixed w-full bg-slate-900 top-0 left-0 z-50 flex__center h-full"
              : ""
          }`}
        >
          <ul
            className={`flex ${
              showModal
                ? "flex-col gap-y-6 w-full bg-slate-900 top-0 left-0 flex__center h-full"
                : "gap-x-6 "
            }`}
          >
            {routes?.map((route: { path: string; id: string }) => {
              return (
                <Link
                  key={route.id}
                  to={route.path}
                  onClick={() => setShowModal(false)}
                >
                  <li
                    className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md ${
                      showModal ? "text-white" : "hover:bg-slate-100 text-black"
                    }  ${routeName === route.path ? "font-semibold" : ""}  ${
                      showModal ? "" : ""
                    }`}
                  >
                    {route.id}
                  </li>
                </Link>
              );
            })}
            {isAuthenticated ? (
              <li
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
                className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md ${
                  showModal ? " text-white" : "text-black hover:bg-slate-100"
                } `}
              >
                {project.LOGOUT.id}
              </li>
            ) : null}
          </ul>
        </nav>

        {showModal ? (
          <IoCloseSharp
            className={`cursor-pointer md:hidden h-6 w-6 z-50 fixed right-5 ${
              showModal ? "text-white font-semibold" : "text-black"
            }`}
            onClick={() => setShowModal(!showModal)}
          />
        ) : (
          <AiOutlineMenu
            className={`cursor-pointer md:hidden h-6 w-6 z-50 fixed right-5 ${
              showModal ? "text-white" : "text-black"
            }`}
            onClick={() => setShowModal(!showModal)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
