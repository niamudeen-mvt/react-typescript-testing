import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import { renderRoutes, routes } from "./routes";
import { ToastContainerNotification } from "./utils/notifications";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {renderRoutes(routes)}
      <ToastContainerNotification />
    </BrowserRouter>
  );
}

export default App;
