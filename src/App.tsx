import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import { renderRoutes } from "./routes";
import { ToastContainerNotification } from "./utils/notifications";
import { MENU_ITEMS } from "./utils/menuItems";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {renderRoutes(MENU_ITEMS)}
      <ToastContainerNotification />
    </BrowserRouter>
  );
}

export default App;
