import { Route, Routes } from "react-router-dom";
import Posts from "../components/Posts";
import Homepage from "../views/pages/Homepage";

export const routes = [
  {
    id: "tasks",
    path: "/",
    element: <Homepage />,
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
