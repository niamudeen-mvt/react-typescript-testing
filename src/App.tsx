import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import { renderRoutes, routes } from "./routes";
import { ToastContainerNotification } from "./utils/notifications";
import PostProvider from "./context/postContext";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PostProvider>{renderRoutes(routes)}</PostProvider>
      <ToastContainerNotification />
    </BrowserRouter>
  );
}

export default App;
