import { Route, Routes } from "react-router-dom";
import Posts from "../components/Posts";
import TaskPage from "../views/pages/TaskPage";

export const routes = [
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
