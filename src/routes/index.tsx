import { Route, Routes } from "react-router-dom";
import Homepage from "../views/pages/Homepage";
import PostsContainer from "../views/pages/posts";

export const routes = [
  {
    id: "tasks",
    path: "/",
    element: <Homepage />,
  },
  {
    id: "posts",
    path: "/posts",
    element: <PostsContainer />,
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
