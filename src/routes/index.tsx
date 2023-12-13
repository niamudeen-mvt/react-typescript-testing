import { Route, Routes } from "react-router-dom";
import Posts from "../components/Posts";
import TaskPage from "../views/pages/TaskPage";
// import LoginPage from "../views/pages/LoginPage";
// import SignupPage from "../views/pages/Singup";

export const routes = [
  // {
  //   id: "login",
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   id: "signup",
  //   path: "/signup",
  //   element: <SignupPage />,
  // },
  {
    id: "tasks",
    path: "/",
    element: <TaskPage />,
  },
  {
    id: "posts",
    path: "/posts",
    element: <Posts />,
  },
  {
    id: "*",
    path: "*",
    element: <TaskPage />,
  },
];

interface IRoutes {
  id: string;
  path: string;
  element: JSX.Element;
}

export const renderRoutes = (routes: IRoutes[]) => {
  return (
    <Routes>
      {routes?.map(
        (route: { id: string; path: string; element: JSX.Element }) => {
          return (
            <Route
              key={route?.id}
              path={route?.path}
              element={route?.element}
            />
          );
        }
      )}
    </Routes>
  );
};
