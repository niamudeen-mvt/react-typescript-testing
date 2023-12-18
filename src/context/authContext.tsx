import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getAccessToken,
  removeAccessToken,
  storeAccessTokenLS,
} from "../utils/helper";
import { useNavigate } from "react-router-dom";

type AuthStateTypes = {
  isLoggedIn: boolean;
  userLogout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextValues: AuthStateTypes = {
  isLoggedIn: false,
  userLogout: () => {},
  setIsLoggedIn: () => {},
};

const AuthContext = createContext(defaultContextValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn, "isLoggedIn");
  const userLogout = async () => {
    console.log("user logout");
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    // removeAccessToken();
  };

  const storedAccessToken = localStorage.getItem("access_token");

  console.log(storedAccessToken);

  useEffect(() => {
    if (storedAccessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [storedAccessToken]);

  const updateTokenFromLocalStorage = () => {
    if (storedAccessToken) {
      console.log("/////////////////");
      setIsLoggedIn(true);
    } else {
      console.log("22222222");
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    console.log("inside useEffect");
    updateTokenFromLocalStorage();

    window.addEventListener("storage", updateTokenFromLocalStorage);

    return () => {
      window.removeEventListener("storage", updateTokenFromLocalStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userLogout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
