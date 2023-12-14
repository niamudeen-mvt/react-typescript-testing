import Homepage from "../../views/pages/Homepage";
import PostsPage from "../../views/pages/posts";

export const menuItems = [
  {
    id: "tasks",
    path: "/",
    element: <Homepage />,
  },
  {
    id: "posts",
    path: "/posts",
    element: <PostsPage />,
  },
];
