import React from "react";
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { useTheme } from "../../context/themeContext";

const Test = () => {
  const { setIsThemeLight } = useTheme();

  return (
    <div className="flex justify-center gap-x-10 w-full">
      <FaMoon size={25} onClick={() => setIsThemeLight(false)} />
      <GoSun size={25} onClick={() => setIsThemeLight(true)} />
    </div>
  );
};

export default Test;
