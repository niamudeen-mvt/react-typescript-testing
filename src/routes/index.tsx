import { Route, Routes } from "react-router-dom";
import Posts from "../components/Posts";
import TaskPage from "../views/pages/TaskPage";
import Login from "../views/pages/Login";

export const routes = [
  {
    id: "login",
    path: "/",
    element: <Login />,
  },
  {
    id: "tasks",
    path: "/tasks",
    element: <TaskPage />,
  },
  {
    id: "posts",
    path: "/posts",
    element: <Posts />,
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
