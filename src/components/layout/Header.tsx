import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { menuItems } from "../../utils/constants";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const { logout, isAuthenticated } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const routeName = useLocation().pathname;
  return (
    <header>
      <div className="max-w-[1200px] mx-auto  h-20 flex__SB px-10">
        <a href="/" className="text-2xl  font-bold text-slate-500">
          Taskify
        </a>

        <nav
          className={`md:block hidden ${
            showModal
              ? "fixed w-full bg-slate-300 top-0 left-0 z-50 flex__center h-full"
              : ""
          }`}
        >
          <ul
            className={`text-md flex ${
              showModal ? "flex-col gap-y-4" : "gap-x-6"
            }`}
          >
            {menuItems
              .filter((route) => route.path !== "*")
              .map((route: { path: string; id: string }) => {
                return isAuthenticated ? (
                  <>
                    <Link
                      key={route.id}
                      to={route.path}
                      onClick={() => setShowModal(false)}
                    >
                      <li
                        className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md hover:bg-slate-100  ${
                          routeName === route.path
                            ? "font-semibold"
                            : "bg-white"
                        }`}
                      >
                        {route.id}
                      </li>
                    </Link>
                  </>
                ) : null;
              })}
            {isAuthenticated ? (
              <li
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
                className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md hover:bg-slate-100 `}
              >
                Logout
              </li>
            ) : (
              <Link to="/">
                <li
                  className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md hover:bg-slate-100 `}
                >
                  Login
                </li>
              </Link>
            )}
          </ul>
        </nav>
        {showModal ? (
          <IoCloseSharp
            className="cursor-pointer md:hidden h-5 w-5 z-50 fixed right-5"
            onClick={() => setShowModal(!showModal)}
          />
        ) : (
          <AiOutlineMenu
            className="cursor-pointer md:hidden h-5 w-5 z-50 fixed right-5"
            onClick={() => setShowModal(!showModal)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
