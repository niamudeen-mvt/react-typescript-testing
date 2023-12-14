import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { menuItems } from "../../utils/constants";

const Header = () => {
  const { logout, isAuthenticated } = useAuth0();
  const routeName = useLocation().pathname;

  return (
    <header>
      <div className="max-w-[1200px] mx-auto  h-20 flex__SB px-10">
        <a href="/" className="text-2xl  font-bold text-slate-500">
          Taskify
        </a>

        <nav>
          <ul className="flex gap-x-6 text-md">
            {menuItems
              .filter((route) => route.path !== "*")
              .map((route: { path: string; id: string }) => {
                return isAuthenticated ? (
                  <>
                    <Link key={route.id} to={route.path}>
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
      </div>
    </header>
  );
};

export default Header;
