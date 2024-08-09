import { Navigate } from "react-router-dom";
import { getItemsFromLC } from "../../utils/helper";
import { _localStorageConfig } from "../../config";


const ProtectedRoutes = ({ children }: {
  children: React.ReactNode
}) => {

  const isAuthenticated = getItemsFromLC(_localStorageConfig.token) ? true : false

  if (!isAuthenticated) return <Navigate to="/login" />

  return <>
    {children}</>
};

export default ProtectedRoutes;
