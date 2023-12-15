import { createContext, useContext, useState } from "react";

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

const ThemeProvider = ({ children }: any) => {
  const [isThemeLight, setIsThemeLight] = useState(false);

  console.log(isThemeLight, "theme");

  return (
    <ThemeContext.Provider value={{ isThemeLight, setIsThemeLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
