import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../context/authContext";
import useWindowSize from "../../hooks/useWindowSize";
import { ALL_ROUTES } from "../../routes";

const Header = () => {
  const routeName = useLocation().pathname;
  const windowSize = useWindowSize();


  const { userLogout, isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (windowSize.width >= 768) {
      setShowModal(false);
    }
  }, [windowSize.width]);



  const MENU_ITEMS =
    ALL_ROUTES && isLoggedIn ?
      ALL_ROUTES.filter((menu) => menu.isPrivate && !menu.isHidden && !menu.excludeFromNav) :
      ALL_ROUTES.filter((menu) => !menu.isPrivate && !menu.isHidden && !menu.excludeFromNav);

  return (
    <header className="bg-white fixed w-full z-50">
      <div className="max-w-[1200px] mx-auto  h-20 flex__SB px-10">
        <a href="/" className="text-2xl  font-bold text-slate-500">
          Taskfiy
        </a>

        <nav
          className={`md:block hidden ${showModal
            ? "fixed w-full bg-slate-900 top-0 left-0 z-50 flex__center h-full"
            : ""
            }`}
        >
          <ul
            className={`flex ${showModal
              ? "flex-col gap-y-6 w-full bg-slate-900 top-0 left-0 flex__center h-full"
              : "gap-x-6 "
              }`}
          >
            {MENU_ITEMS?.map((route: { path: string; id: string }) => {
              return (
                <Link
                  key={route.id}
                  to={route.path}
                  onClick={() => setShowModal(false)}
                >
                  <li
                    className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md ${showModal
                      ? "text-white"
                      : "hover:bg-slate-100 text-slate-500"
                      }  ${routeName === route.path ? "font-semibold" : ""}`}
                  >
                    {route.id}
                  </li>
                </Link>
              );
            })}
            {isLoggedIn && (
              <Link to="/">
                <li
                  onClick={userLogout}
                  className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md ${showModal
                    ? " text-white"
                    : "text-slate-500 hover:bg-slate-100"
                    } `}
                >
                  logout
                </li>
              </Link>
            )}
          </ul>
        </nav>
        {showModal ? (
          <IoCloseSharp
            className={`cursor-pointer md:hidden h-6 w-6 z-50 fixed right-5 ${showModal ? "text-white font-semibold" : "text-black"
              }`}
            onClick={() => setShowModal(!showModal)}
          />
        ) : (
          <AiOutlineMenu
            className={`cursor-pointer md:hidden h-6 w-6 z-50 fixed right-5 ${showModal ? "text-white" : "text-black"
              }`}
            onClick={() => setShowModal(!showModal)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
