import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import { ToastContainerNotification } from "./utils/notifications";
import ThemeProvider from "./context/themeContext";
import Homepage from "./views/pages/Homepage";
import LoginPage from "./views/pages/LoginPage";
import TaskPage from "./views/pages/tasks";
import PostsContainer from "./views/pages/posts";
import SignupPage from "./views/pages/Signup";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="tasks" element={<TaskPage />} />
            <Route path="posts" element={<PostsContainer />} />
          </Route>
          <Route path="*" element={<Homepage />} />
        </Routes>
      </ThemeProvider>
      <ToastContainerNotification />
    </BrowserRouter>
  );
};

export default App;
