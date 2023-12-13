import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  return <div onClick={() => loginWithRedirect()}>login</div>;
};

export default LoginPage;
