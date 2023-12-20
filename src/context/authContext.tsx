import React, { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "../services/api/user";
import { removeAccessToken } from "../utils/helper";

type AuthStateTypes = {
  isLoggedIn: boolean;
  userLogout: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  authUser: {
    _id?: string;
    name: string;
  };
};

const defaultContextValues: AuthStateTypes = {
  isLoggedIn: false,
  userLogout: () => {},
  setIsLoggedIn: () => {},
  authUser: {
    _id: "",
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

  const fetchUserDetails = async () => {
    let res = await getUser();
    if (res.status === 200) {
      setAuthUser(res.data.user);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn]);

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

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userLogout, setIsLoggedIn, authUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
