import ThemeProvider from "../../context/themeContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainerNotification } from "../../utils/notifications";

const LayoutRoute = () => {
  return (
    <>
      <Header />
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
      <ToastContainerNotification />
    </>
  );
};

export default LayoutRoute;
