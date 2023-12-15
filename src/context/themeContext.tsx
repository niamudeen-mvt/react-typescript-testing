import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ThemeState = {
  isThemeLight: boolean;
  setIsThemeLight: React.Dispatch<React.SetStateAction<boolean>>;
};
const defaultValue: ThemeState = {
  isThemeLight: true,
  setIsThemeLight: () => {},
};

const ThemeContext = createContext<ThemeState>(defaultValue);

export const useTheme = () => {
  return useContext(ThemeContext);
};

const PRIVATE_ROUTES = ["/posts"];

const ThemeProvider = ({ children }: any) => {
  const [isThemeLight, setIsThemeLight] = useState(true);
  const { isAuthenticated } = useAuth0();

  const navigate = useNavigate();
  const routeName = useLocation().pathname;

  console.log(isThemeLight, "isThemeLight");

  useEffect(() => {
    if (!isAuthenticated && PRIVATE_ROUTES.includes(routeName)) {
      navigate("/");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isThemeLight, setIsThemeLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
