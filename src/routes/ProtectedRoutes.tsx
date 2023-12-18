import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import Homepage from "../views/pages/Homepage";

// const PRIVATE_ROUTES = ["/tasks"];
// const PUBLIC_ROUTES = ["/login"];

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  // const navigate = useNavigate();
  // const routeName = useLocation().pathname;

  // useEffect(() => {
  //   if (PUBLIC_ROUTES.includes(routeName) && isLoggedIn) {
  //     navigate("/tasks");
  //   } else if (PRIVATE_ROUTES.includes(routeName) && !isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [routeName]);

  return <>{isLoggedIn ? <Outlet /> : <Homepage />}</>;
};

export default ProtectedRoutes;
