import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import Homepage from "../views/pages/Homepage";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/tasks");
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn ? <Outlet /> : <Homepage />}</>;
};

export default ProtectedRoutes;
