import { createBrowserRouter } from "react-router-dom";
import GalleryPage from "../views/pages/GalleryPage";
import Homepage from "../views/pages/Homepage";
import LoginPage from "../views/pages/LoginPage";
import SignupPage from "../views/pages/Signup";
import PostsContainer from "../views/pages/posts";
import TaskPage from "../views/pages/tasks";
import LayoutRoute from "../components/layout/LayoutRoute";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import QuizPage from "../views/pages/quiz";

export const router = createBrowserRouter([
  {
    element: <LayoutRoute />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "tasks",
            element: <TaskPage />,
          },
          {
            path: "posts",
            element: <PostsContainer />,
          },
          {
            path: "gallery",
            element: <GalleryPage />,
          },
          {
            path: "quiz",
            element: <QuizPage />,
          },
        ],
      },
      {
        path: "*",
        element: <Homepage />,
      },
    ],
  },
]);

export const MENU_ITEMS = [
  {
    id: "home",
    path: "/",
    type: "public",
    element: <Homepage />,
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
    id: "tasks",
    path: "/tasks",
    type: "protected",
    element: <TaskPage />,
  },
  {
    id: "quiz",
    path: "/quiz",
    type: "protected",
    element: <QuizPage />,
  },
  {
    id: "posts",
    path: "/posts",
    type: "protected",
    element: <PostsContainer />,
  },
  {
    id: "gallery",
    path: "/gallery",
    type: "protected",
    element: <GalleryPage />,
  },
];
