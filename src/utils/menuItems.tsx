import Homepage from "../views/pages/Homepage";
import LoginPage from "../views/pages/LoginPage";
import SignupPage from "../views/pages/Singup";
import PostsContainer from "../views/pages/posts";
import TaskPage from "../views/pages/tasks";

export const MENU_ITEMS = [
  {
    id: "home",
    path: "/",
    element: <Homepage />,
  },
  {
    id: "login",
    path: "/login",
    element: <LoginPage />,
  },
  {
    id: "signup",
    path: "/signup",
    element: <SignupPage />,
  },
  {
    id: "tasks",
    path: "/tasks",
    type: "protected",
    element: <TaskPage />,
  },
  {
    id: "posts",
    path: "/posts",
    type: "protected",
    element: <PostsContainer />,
  },
];
