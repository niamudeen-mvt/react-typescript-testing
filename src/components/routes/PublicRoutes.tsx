import { Navigate } from "react-router-dom";


const PublicRoutes = ({ children }: {
  children: React.ReactNode
}) => {

  const isAuthenticated = localStorage.getItem("access_token") ? true : false

  if (isAuthenticated) return <Navigate to="/tasks" />

  return <>
    {children}</>
};

export default PublicRoutes;
