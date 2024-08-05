import { ReactNode, createContext, useContext, useState } from "react";

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

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isThemeLight, setIsThemeLight] = useState(false);

  return (
    <ThemeContext.Provider value={{ isThemeLight, setIsThemeLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
