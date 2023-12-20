import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import Homepage from "../views/pages/Homepage";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn ? <Outlet /> : <Homepage />}</>;
};

export default ProtectedRoutes;
