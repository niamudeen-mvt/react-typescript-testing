import { RouterProvider } from "react-router-dom";
import { _router } from "./routes";

const App = () => {
  return <RouterProvider router={_router} />;
};

export default App;
