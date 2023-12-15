import Homepage from "../views/pages/Homepage";
// import Test from "../views/pages/Test";
import PostsContainer from "../views/pages/posts";
import { project } from "./constants";

export const MENU_ITEMS = [
  {
    id: project.LOGIN.id,
    path: project.LOGIN.path,
    element: <Homepage />,
  },
  {
    id: project.TASKS.id,
    path: project.TASKS.path,
    element: <Homepage />,
  },
  {
    id: project.POSTS.id,
    path: project.POSTS.path,
    element: <PostsContainer />,
  },
  // {
  //   id: "test",
  //   path: "/test",
  //   element: <Test />,
  // },
];
