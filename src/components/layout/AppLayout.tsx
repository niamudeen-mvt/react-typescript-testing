import ThemeProvider from "../../context/themeContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainerNotification } from "../../utils/notifications";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </main>
      <ToastContainerNotification />
    </>
  );
};

export default AppLayout;
