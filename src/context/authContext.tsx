import React, { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "../services/api/user";
import { removeAccessToken } from "../utils/helper";

type AuthStateTypes = {
  isLoggedIn: boolean;
  userLogout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  authUser: {
    name: string;
  };
};

const defaultContextValues: AuthStateTypes = {
  isLoggedIn: false,
  userLogout: () => {},
  setIsLoggedIn: () => {},
  authUser: {
    name: "",
  },
};

const AuthContext = createContext(defaultContextValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState({ name: "" });

  const userLogout = async () => {
    removeAccessToken();
    setIsLoggedIn(false);
  };

  const storedAccessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (storedAccessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [storedAccessToken]);

  const updateTokenFromLocalStorage = () => {
    if (storedAccessToken) {
      setIsLoggedIn(true);
    } else {
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

  const fetchUserDetails = async () => {
    let res = await getUser();
    console.log(res, "es");
    if (res.status === 200) {
      setAuthUser(res.data.user);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userLogout, setIsLoggedIn, authUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
