import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({ children }: {
  children: React.ReactNode
}) => {

  const isAuthenticated = localStorage.getItem("access_token") ? true : false

  if (!isAuthenticated) return <Navigate to="/login" />

  return <>
    {children}</>
};

export default ProtectedRoutes;
