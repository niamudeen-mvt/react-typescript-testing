import { Navigate } from "react-router-dom";
import { getItemsFromLC } from "../../utils/helper";
import { _localStorageConfig } from "../../config";


const PublicRoutes = ({ children }: {
  children: React.ReactNode
}) => {

  const isAuthenticated = getItemsFromLC(_localStorageConfig.token) ? true : false

  if (isAuthenticated) return <Navigate to="/tasks" />

  return <>
    {children}</>
};

export default PublicRoutes;
