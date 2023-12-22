import { useAuth } from "../context/authContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Homepage from "../views/pages/Homepage";
import { useEffect } from "react";

const PUBLIC_ROUTES = ["/login", "/signup"];

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  const routeName = useLocation().pathname;
  const navigate = useNavigate();

  console.log(PUBLIC_ROUTES.includes(routeName), typeof routeName, isLoggedIn);

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(routeName) && isLoggedIn) {
      navigate("/tasks");
    }
  }, [routeName, isLoggedIn]);

  console.log(routeName);

  return <>{isLoggedIn ? <Outlet /> : <Homepage />}</>;
};

export default ProtectedRoutes;
