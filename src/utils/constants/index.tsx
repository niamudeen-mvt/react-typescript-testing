import Posts from "../../components/Posts";
import Homepage from "../../views/pages/Homepage";

export const menuItems = [
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
