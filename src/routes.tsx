import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";
import PostsContainer from "./pages/posts";
import TaskPage from "./pages/tasks";
import QuizPage from "./pages/quiz";
import StoriesPage from "./pages/Stories";
import NotFoundPage from "./pages/NotFoundPage";
import PublicRoutes from "./components/routes/PublicRoutes";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AppLayout from "./components/layout/AppLayout";

export const ALL_ROUTES = [
  {
    id: "home",
    path: "/",
    element: <HomePage />,
  },
  {
    id: "signup",
    path: "/signup",
    element: <SignupPage />,
  },
  {
    id: "login",
    path: "/login",
    element: <LoginPage />,
  },
  {
    id: "stories",
    path: "/stories",
    element: <StoriesPage />,
    isPrivate: true,
  },
  {
    id: "tasks",
    path: "/tasks",
    element: <TaskPage />,
    isPrivate: true,
  },
  {
    id: "quiz",
    path: "/quiz",
    type: "protected",
    element: <QuizPage />,
    isPrivate: true,
    isHidden: false,
  },
  {
    id: "posts",
    path: "/posts",
    type: "protected",
    element: <PostsContainer />,
    isPrivate: true,
  },
];

export const PUBLIC_ROUTES = ALL_ROUTES.filter(
  (route) => !route?.isPrivate && !route.isHidden
).map((route) => {
  return {
    ...route,
    element: <PublicRoutes>{route?.element}</PublicRoutes>,
  };
});

export const PRIVATE_ROUTES = ALL_ROUTES.filter(
  (route) => route?.isPrivate && !route.isHidden
).map((route) => {
  return {
    ...route,
    path: route?.path,
    element: <ProtectedRoutes>{route?.element}</ProtectedRoutes>,
  };
});

export const _ROUTER = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [...PUBLIC_ROUTES, ...PRIVATE_ROUTES],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
