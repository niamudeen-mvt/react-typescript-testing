import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import { renderRoutes } from "./routes";
import { ToastContainerNotification } from "./utils/notifications";
import { MENU_ITEMS } from "./utils/menuItems";
import ThemeProvider from "./context/themeContext";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ThemeProvider>{renderRoutes(MENU_ITEMS)}</ThemeProvider>
      <ToastContainerNotification />
    </BrowserRouter>
  );
}

export default App;
